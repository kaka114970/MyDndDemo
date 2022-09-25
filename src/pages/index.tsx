import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import DndPro from './dndPro';
import React from 'react';

interface DataType {
  key: string;
  name: string;
  sportTime: number;
  weight: number;
  date: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '性别',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <span>{text == '费丽君' ? '女' : '男'}</span>,
  },
  {
    title: '日期',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: '运动时间',
    dataIndex: 'sportTime',
    key: 'sportTime',
    render: (text) => <span>{text} min</span>,
  },
  {
    title: '体重',
    dataIndex: 'weight',
    key: 'weight',
    render: (text) => <span>{text} 公斤</span>,
  },
  {
    title: 'BMI',
    // BMI=体重÷身高2
    render: (text) => <span>{}</span>,
  },
];

const data: DataType[] = [
  {
    key: '1',
    name: '费丽君',
    date: `8-28`,
    sportTime: 40,
    weight: 62.3,
  },
  {
    key: '2',
    name: '胡伟强',
    date: `8-28`,
    sportTime: 40,
    weight: 72,
  },
];

const App: React.FC = () => (
  <>
    {/* <Table columns={columns} dataSource={data} /> */}
    <DndPro />
  </>
);

export default App;
