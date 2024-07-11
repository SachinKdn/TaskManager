import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ITask {
  _id: string;
  title: string;
  desc: string;
  priority: string;
  stage: string;
  estTime: number;
  assignedTo: string;
}

interface IUser {
  _id: string;
  name: string;
  email: string;
}

interface IUserTaskCount {
  name: string;
  taskCount: number;
}

const TaskGraph: React.FC = () => {
  const tasks: ITask[] = [
    { _id: '1', title: 'Task 1', desc: 'Description 1', priority: 'high', stage: 'todo', estTime: 3, assignedTo: '1' },
    { _id: '2', title: 'Task 2', desc: 'Description 2', priority: 'medium', stage: 'inProgress', estTime: 5, assignedTo: '1' },
    { _id: '3', title: 'Task 3', desc: 'Description 3', priority: 'low', stage: 'done', estTime: 2, assignedTo: '2' },
    { _id: '4', title: 'Task 4', desc: 'Description 4', priority: 'medium', stage: 'todo', estTime: 4, assignedTo: '5' },
    { _id: '5', title: 'Task 5', desc: 'Description 5', priority: 'high', stage: 'inProgress', estTime: 6, assignedTo: '5' },
    { _id: '5', title: 'Task 5', desc: 'Description 5', priority: 'high', stage: 'inProgress', estTime: 6, assignedTo: '5' },
    { _id: '5', title: 'Task 5', desc: 'Description 5', priority: 'high', stage: 'inProgress', estTime: 6, assignedTo: '5' }
  ];

  const users: IUser[] = [
    { _id: '1', name: 'User 1', email: 'user1@example.com' },
    { _id: '2', name: 'User 2', email: 'user2@example.com' },
    { _id: '3', name: 'User 3', email: 'user3@example.com' },
    { _id: '4', name: 'User 1', email: 'user1@example.com' },
    { _id: '5', name: 'User 2', email: 'user2@example.com' },
    { _id: '6', name: 'User 3', email: 'user3@example.com' }
  ];

  const [userTaskCounts, setUserTaskCounts] = useState<IUserTaskCount[]>([]);

  useEffect(() => {
    const taskCountMap: { [key: string]: number } = {};

    tasks.forEach(task => {
      taskCountMap[task.assignedTo] = (taskCountMap[task.assignedTo] || 0) + 1;
    });

    const userTaskCounts: IUserTaskCount[] = users.map(user => ({
      name: user.name,
      taskCount: taskCountMap[user._id] || 0,
    }));

    setUserTaskCounts(userTaskCounts);
  }, []);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={userTaskCounts} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="taskCount" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TaskGraph;
