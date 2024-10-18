import React from 'react';
import './machines.css'
const Machines = () => {
    // Mock data for machines
    const machinesData = [
        { id: 1, name: 'Machine A', status: 'Active' },
        { id: 2, name: 'Machine B', status: 'Inactive' },
        { id: 3, name: 'Machine C', status: 'Active' },
    ];

    return (
        <div id="machines">
            <h2>Machines</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {machinesData.map(machine => (
                        <tr key={machine.id}>
                            <td>{machine.id}</td>
                            <td>{machine.name}</td>
                            <td>{machine.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Machines;
