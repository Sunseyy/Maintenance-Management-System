from flask import request, jsonify, render_template
from sqlalchemy import func
import json
import datetime
from models import WeldingData, StampingPressData, PaintingRobotData, AGVData, CNCData, LeakTestData
from config import db  
import pandas as pd
import plotly.express as px


latest_data = {}
# Threshold values for welding robot (and other machines if necessary)
WELDING_THRESHOLD = {
    'weld_temperature': (1000, 1200),  # min, max
    'weld_current': (150, 300),
    'weld_voltage': (20, 30),
    'pressure_applied': (500, 1000),
    'vibration_level': (0, 5),
    'power_consumption': (100, 500)
}

STAMPING_THRESHOLD = {
    'press_force': (10000, 20000),  # Force in Newtons
    'press_speed': (10, 50),  # Speed in Strokes per minute
    'cycle_time': (1, 3),  # Time in seconds
    'die_temperature': (50, 150),  # Temperature in degrees Celsius
    'vibration_level': (0, 3),  # Vibration level (arbitrary units)
    'power_consumption': (500, 2000)  # Power consumption in Watts
}

PAINTING_THRESHOLD = {
    'paint_flow_rate': (50, 150),  # Paint flow rate in ml/min
    'nozzle_pressure': (2, 10),  # Nozzle pressure in Bar
    'robot_speed': (10, 30),  # Speed in cm/s
    'spray_temperature': (20, 40),  # Temperature in degrees Celsius
    'vibration_level': (0, 2),  # Vibration level (arbitrary units)
    'power_consumption': (100, 400)  # Power consumption in Watts
}

AGV_THRESHOLD = {
    'battery_level': (20, 100),  # Battery level in percentage
    'speed': (0.5, 2.0),  # Speed in m/s
    'load_weight': (0, 1000),  # Load weight in kg
    'distance_traveled': (0, 1000),  # Distance in meters
    'obstacle_distance': (0, 10),  # Obstacle distance in meters
    'power_consumption': (50, 200)  # Power consumption in Watts
}

CNC_THRESHOLD = {
    'spindle_speed': (5000, 20000),  # Spindle speed in RPM
    'feed_rate': (50, 500),  # Feed rate in mm/min
    'cutting_temperature': (50, 150),  # Temperature in degrees Celsius
    'vibration_level': (0, 3),  # Vibration level (arbitrary units)
    'cutting_force': (500, 1500),  # Force in Newtons
    'power_consumption': (1000, 5000)  # Power consumption in Watts
}

LEAK_TEST_THRESHOLD = {
    'test_pressure': (500, 1000),  # Pressure in Pascals
    'leak_rate': (0, 0.5),  # Leak rate in liters/minute
    'test_duration': (10, 30),  # Test duration in seconds
    'ambient_temperature': (15, 35),  # Temperature in degrees Celsius
    'vibration_level': (0, 2),  # Vibration level (arbitrary units)
    'power_consumption': (50, 150)  # Power consumption in Watts
}

THRESHOLDS = {
    "welding_robot_006": WELDING_THRESHOLD,
    "stamping_press_001": STAMPING_THRESHOLD,
    "painting_robot_002": PAINTING_THRESHOLD,
    "agv_003": AGV_THRESHOLD,
    "cnc_milling_004": CNC_THRESHOLD,
    "leak_test_005": LEAK_TEST_THRESHOLD
}

def check_thresholds(machine_id, data):
    machine_thresholds = THRESHOLDS.get(machine_id)
    print(machine_thresholds)
    
    if not machine_thresholds:
        print(f"No thresholds defined for machine: {machine_id}")
        return

    for key, (min_val, max_val) in machine_thresholds.items():
        if key in data and not (min_val <= data[key] <= max_val):
            send_alert(machine_id, key, data[key], min_val, max_val)
        else:
            print('===========  no alerts  ===========')


def send_alert(machine_id, parameter, value, min_val, max_val):
    print(f"ALERT: {machine_id} - {parameter} out of range: {value}. Expected range: ({min_val}, {max_val})")


def register_routes(app):
    @app.route('/')
    def index():
        machines = [
        'welding',
        'stamping',
        'painting',
        'agv',
        'cnc',
        'leak_test'
        ]
        return render_template('index.html', machines = machines, sensor_data=json.dumps(latest_data, indent=2))

    @app.route('/sensor-data', methods=['GET' ,'POST'])
    def receive_sensor_data():
        global latest_data
        latest_data = request.json 

        if not latest_data:
            return jsonify({"error": "Invalid or missing JSON data"}), 400
        
        print(latest_data)

        machine_id = latest_data['machine_id']

        check_thresholds(machine_id, latest_data)

        new_record = None

        if machine_id == "welding_robot_006":
            new_record = WeldingData(
                machine_id=machine_id,
                weld_temperature=latest_data['weld_temperature'],
                weld_current=latest_data['weld_current'],
                weld_voltage=latest_data['weld_voltage'],
                weld_time=latest_data['weld_time'],
                pressure_applied=latest_data['pressure_applied'],
                arm_position_x=latest_data['arm_position']['x'],
                arm_position_y=latest_data['arm_position']['y'],
                arm_position_z=latest_data['arm_position']['z'],
                wire_feed_rate=latest_data['wire_feed_rate'],
                gas_flow_rate=latest_data['gas_flow_rate'],
                weld_strength_estimate=latest_data['weld_strength_estimate'],
                vibration_level=latest_data['vibration_level'],
                power_consumption=latest_data['power_consumption'],
                timestamp=datetime.datetime.now()
            )
        elif latest_data['machine_id'] == "agv_003":
            new_record = AGVData(
                machine_id=latest_data['machine_id'],
                location_x=latest_data['location']['x'],
                location_y=latest_data['location']['y'],
                location_z=latest_data['location']['z'],
                battery_level=latest_data['battery_level'],
                load_weight=latest_data['load_weight'],
                speed=latest_data['speed'],
                distance_traveled=latest_data['distance_traveled'],
                obstacle_detection=latest_data['obstacle_detection'],
                navigation_status=latest_data['navigation_status'],
                vibration_level=latest_data['vibration_level'],
                temperature=latest_data['temperature'],
                wheel_rotation_speed=latest_data['wheel_rotation_speed'],
                timestamp=datetime.datetime.now()
            )
        elif latest_data['machine_id'] == "cnc_milling_004":
            new_record = CNCData(
                machine_id=latest_data['machine_id'],
                spindle_speed=latest_data['spindle_speed'],
                tool_wear_level=latest_data['tool_wear_level'],
                cut_depth=latest_data['cut_depth'],
                feed_rate=latest_data['feed_rate'],
                vibration_level=latest_data['vibration_level'],
                coolant_flow_rate=latest_data['coolant_flow_rate'],
                material_hardness=latest_data['material_hardness'],
                power_consumption=latest_data['power_consumption'],
                temperature=latest_data['temperature'],
                chip_load=latest_data['chip_load'],
                timestamp=datetime.datetime.now()
            )
        elif latest_data['machine_id'] == "leak_test_005":
            new_record = LeakTestData(
                machine_id=latest_data['machine_id'],
                test_pressure=latest_data['test_pressure'],
                pressure_drop=latest_data['pressure_drop'],
                leak_rate=latest_data['leak_rate'],
                test_duration=latest_data['test_duration'],
                temperature=latest_data['temperature'],
                status=latest_data['status'],
                fluid_type=latest_data['fluid_type'],
                seal_condition=latest_data['seal_condition'],
                test_cycle_count=latest_data['test_cycle_count'],
                timestamp=datetime.datetime.now()
            )
        elif latest_data['machine_id'] == "painting_robot_002":
            new_record = PaintingRobotData(
                machine_id=latest_data['machine_id'],
                spray_pressure=latest_data['spray_pressure'],
                paint_thickness=latest_data['paint_thickness'], 
                arm_position_x=latest_data['arm_position']['x'],  
                arm_position_y=latest_data['arm_position']['y'],  
                arm_position_z=latest_data['arm_position']['z'],  
                temperature=latest_data['temperature'],  
                humidity=latest_data['humidity'],  
                paint_flow_rate=latest_data['paint_flow_rate'], 
                paint_volume_used=latest_data['paint_volume_used'],  
                atomizer_speed=latest_data['atomizer_speed'],  
                overspray_capture_efficiency=latest_data['overspray_capture_efficiency'],  
                booth_airflow_velocity=latest_data['booth_airflow_velocity'],  
                solvent_concentration=latest_data['solvent_concentration'],  
                timestamp=datetime.datetime.now()
            )
        elif latest_data['machine_id'] == "stamping_press_001":
            new_record = StampingPressData(
                machine_id=latest_data['machine_id'],
                force_applied=latest_data['force_applied'],
                cycle_time=latest_data['cycle_time'],
                temperature=latest_data['temperature'],
                vibration_level=latest_data['vibration_level'],
                cycle_count=latest_data['cycle_count'],
                oil_pressure=latest_data['oil_pressure'],
                die_alignment=latest_data['die_alignment'],
                sheet_thickness=latest_data['sheet_thickness'],
                power_consumption=latest_data['power_consumption'],
                noise_level=latest_data['noise_level'],
                lubrication_flow_rate=latest_data['lubrication_flow_rate'],
                timestamp=datetime.datetime.now()
            )
        
        db.session.add(new_record)
        print('\n------------------------------------------------------------------------- rec\n')
        db.session.commit()
        
        return jsonify({"status": "success"}), 200              




    @app.route('/visualization/<machine_type>')
    def visualization(machine_type):
        # Define a mapping of machine types to their data models and columns
        machine_models = {
            'welding': (WeldingData, ['weld_temperature', 'weld_current', 'weld_voltage', 
                                    'weld_time', 'pressure_applied', 'wire_feed_rate', 
                                    'gas_flow_rate', 'weld_strength_estimate', 
                                    'vibration_level', 'power_consumption']),
            
            'stamping': (StampingPressData, ['force_applied', 'cycle_time', 'temperature', 
                                            'vibration_level', 'cycle_count', 'oil_pressure', 
                                             'sheet_thickness', 'power_consumption', 'noise_level', 
                                            'lubrication_flow_rate']),
            
            'painting': (PaintingRobotData, ['spray_pressure', 'paint_thickness', 'temperature', 
                                            'humidity', 'paint_flow_rate', 'paint_volume_used', 
                                            'atomizer_speed', 'overspray_capture_efficiency', 
                                            'booth_airflow_velocity', 'solvent_concentration']),
            
            'agv': (AGVData, ['battery_level', 'load_weight', 'wheel_rotation_speed',
                            'speed', 'distance_traveled',  'temperature', 'vibration_level']),
            
            'cnc': (CNCData, ['spindle_speed', 'tool_wear_level', 'cut_depth', 'feed_rate', 
                            'vibration_level', 'coolant_flow_rate', 
                            'material_hardness', 'power_consumption', 
                            'temperature', 'chip_load']),
            
            'leak_test': (LeakTestData, ['test_pressure', 'pressure_drop', 'leak_rate', 
                                        'test_duration', 'temperature', 
                                        'test_cycle_count'])
        }

        # Get the model and columns based on the machine type
        model, columns = machine_models.get(machine_type.lower(), (None, None))

        if model is None:
            return "Machine type not found", 404

        # Fetch data from the selected machine model
        machine_data = model.query.all()
        
        data = []
        for record in machine_data:
            # Create a dictionary for each record with the timestamp and the relevant columns
            record_dict = {'timestamp': record.timestamp}
            for column in columns:
                record_dict[column] = getattr(record, column)
            data.append(record_dict)

        # Convert to DataFrame
        df = pd.DataFrame(data)
        df['timestamp'] = pd.to_datetime(df['timestamp'])
        hourly_data = df.resample('h', on='timestamp').mean().reset_index()

        # Create plots
        plots = []
        for column in columns:
            fig = px.line(hourly_data, x='timestamp', y=column, 
                        title=f'Average {column.replace("_", " ").capitalize()} Per Hour for {machine_type.capitalize()}')
            plots.append(fig.to_html(full_html=False))

        return render_template('visualization.html', plots=plots)
