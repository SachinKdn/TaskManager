// import React, { useEffect, useState } from 'react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// interface ITask {
//   _id: string;
//   title: string;
//   desc: string;
//   priority: string;
//   stage: string;
//   estTime: number;
//   assignedTo: string;
// }

// interface IUser {
//   _id: string;
//   name: string;
//   email: string;
// }

// interface IUserTaskCount {
//   name: string;
//   taskCount: number;
// }

// const TaskGraph: React.FC = () => {
//   const tasks: ITask[] = [
//     { _id: '1', title: 'Task 1', desc: 'Description 1', priority: 'high', stage: 'todo', estTime: 3, assignedTo: '1' },
//     { _id: '2', title: 'Task 2', desc: 'Description 2', priority: 'medium', stage: 'inProgress', estTime: 5, assignedTo: '1' },
//     { _id: '3', title: 'Task 3', desc: 'Description 3', priority: 'low', stage: 'done', estTime: 2, assignedTo: '2' },
//     { _id: '4', title: 'Task 4', desc: 'Description 4', priority: 'medium', stage: 'todo', estTime: 4, assignedTo: '5' },
//     { _id: '5', title: 'Task 5', desc: 'Description 5', priority: 'high', stage: 'inProgress', estTime: 6, assignedTo: '5' },
//     { _id: '5', title: 'Task 5', desc: 'Description 5', priority: 'high', stage: 'inProgress', estTime: 6, assignedTo: '5' },
//     { _id: '5', title: 'Task 5', desc: 'Description 5', priority: 'high', stage: 'inProgress', estTime: 6, assignedTo: '5' }
//   ];

//   const users: IUser[] = [
//     { _id: '1', name: 'User 1', email: 'user1@example.com' },
//     { _id: '2', name: 'User 2', email: 'user2@example.com' },
//     { _id: '3', name: 'User 3', email: 'user3@example.com' },
//     { _id: '4', name: 'User 1', email: 'user1@example.com' },
//     { _id: '5', name: 'User 2', email: 'user2@example.com' },
//     { _id: '6', name: 'User 3', email: 'user3@example.com' }
//   ];

//   const [userTaskCounts, setUserTaskCounts] = useState<IUserTaskCount[]>([]);

//   useEffect(() => {
//     const taskCountMap: { [key: string]: number } = {};

//     tasks.forEach(task => {
//       taskCountMap[task.assignedTo] = (taskCountMap[task.assignedTo] || 0) + 1;
//     });

//     const userTaskCounts: IUserTaskCount[] = users.map(user => ({
//       name: user.name,
//       taskCount: taskCountMap[user._id] || 0,
//     }));

//     setUserTaskCounts(userTaskCounts);
//   }, []);

//   return (
//     <ResponsiveContainer width="100%" height={400}>
//       <BarChart data={userTaskCounts} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="name" />
//         <YAxis />
//         <Tooltip />
//         <Legend />
//         <Bar dataKey="taskCount" fill="#8884d8" />
//       </BarChart>
//     </ResponsiveContainer>
//   );
// };

// export default TaskGraph;














import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts';
import dayjs from 'dayjs';

interface ITask {
  _id: string;
  title: string;
  desc: string;
  priority: string;
  stage: string;
  estTime: number;
  assignedTo: string;
  startTime: string;
  endTime: string;
}

interface IUser {
  _id: string;
  name: string;
  email: string;
}

interface IUserTask {
  name: string;
  tasks: ITask[];
}

// Sample tasks and users data
const tasks: ITask[] = [
  { _id: '1', title: 'Design Homepage', desc: 'Create a new homepage design.', priority: 'high', stage: 'todo', estTime: 8, assignedTo: '1', startTime: '2024-07-01', endTime: '2024-07-02' },
  { _id: '2', title: 'Implement Login', desc: 'Develop login functionality.', priority: 'medium', stage: 'inProgress', estTime: 10, assignedTo: '1', startTime: '2024-07-03', endTime: '2024-07-05' },
  { _id: '3', title: 'Database Setup', desc: 'Set up the database schema.', priority: 'low', stage: 'done', estTime: 5, assignedTo: '2', startTime: '2024-07-02', endTime: '2024-07-03' },
  { _id: '4', title: 'API Development', desc: 'Develop the backend APIs.', priority: 'high', stage: 'todo', estTime: 15, assignedTo: '2', startTime: '2024-07-04', endTime: '2024-07-08' },
  { _id: '5', title: 'UI Testing', desc: 'Test the UI components.', priority: 'medium', stage: 'inProgress', estTime: 6, assignedTo: '3', startTime: '2024-07-05', endTime: '2024-07-06' },
  { _id: '6', title: 'Deploy to Staging', desc: 'Deploy the app to staging environment.', priority: 'low', stage: 'done', estTime: 4, assignedTo: '3', startTime: '2024-07-07', endTime: '2024-07-08' },
  { _id: '7', title: 'User Feedback', desc: 'Gather user feedback.', priority: 'high', stage: 'todo', estTime: 3, assignedTo: '4', startTime: '2024-07-08', endTime: '2024-07-08' },
  { _id: '8', title: 'Bug Fixes', desc: 'Fix bugs reported by QA.', priority: 'medium', stage: 'inProgress', estTime: 12, assignedTo: '4', startTime: '2024-07-09', endTime: '2024-07-11' },
  { _id: '9', title: 'Performance Optimization', desc: 'Optimize the app for better performance.', priority: 'low', stage: 'done', estTime: 8, assignedTo: '5', startTime: '2024-07-10', endTime: '2024-07-12' },
  { _id: '10', title: 'Code Review', desc: 'Conduct a code review session.', priority: 'high', stage: 'todo', estTime: 2, assignedTo: '5', startTime: '2024-07-12', endTime: '2024-07-12' }
];

const users: IUser[] = [
  { _id: '1', name: 'Alice Johnson', email: 'alice@example.com' },
  { _id: '2', name: 'Bob Smith', email: 'bob@example.com' },
  { _id: '3', name: 'Charlie Brown', email: 'charlie@example.com' },
  { _id: '4', name: 'Diana Prince', email: 'diana@example.com' },
  { _id: '5', name: 'Eve Adams', email: 'eve@example.com' }
];

const TaskGraph: React.FC = () => {
  const [userTasks, setUserTasks] = useState<IUserTask[]>([]);

  useEffect(() => {
    const userTasks: IUserTask[] = users.map(user => ({
      name: user.name,
      tasks: tasks.filter(task => task.assignedTo === user._id)
    }));
    setUserTasks(userTasks);
  }, []);

  const flattenTasks = () => {
    return userTasks.flatMap(userTask => 
      userTask.tasks.map(task => ({
        name: userTask.name,
        taskTitle: task.title,
        startTime: dayjs(task.startTime).valueOf(),
        endTime: dayjs(task.endTime).valueOf(),
        duration: dayjs(task.endTime).diff(dayjs(task.startTime), 'day'),
      }))
    );
  };

  const data = flattenTasks();

  return (
    <ResponsiveContainer width="100%" height={500}>
      <BarChart data={data} layout="vertical" margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" dataKey="startTime" domain={['auto', 'auto']} tickFormatter={tick => dayjs(tick).format('MMM D')} />
        <YAxis type="category" dataKey="name" />
        <Tooltip labelFormatter={(label) => dayjs(label).format('MMM D, YYYY')} />
        <Bar dataKey="duration" fill="#8884d8" barSize={20}>
          <LabelList dataKey="taskTitle" position="inside" />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TaskGraph;
