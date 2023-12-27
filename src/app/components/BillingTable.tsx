'use client';
import { Button, ConfigProvider, Form, FormInstance, Input, InputRef, Popconfirm, Table, theme } from "antd";
import React from "react";
import { useContext, useEffect, useRef, useState } from "react";

const BillingTable: React.FC<any> = ({ tableData, setTableData }) => {

    const [dataSource, setDataSource] = useState<DataType[]>([]);
    const [count, setCount] = useState(2);

    useEffect(() => {
        setTableData(dataSource)
    }, [dataSource])

    const handleDelete = (key: React.Key) => {
        const newData = dataSource.filter((item: any) => item.key !== key);
        setDataSource(newData);
    };

    const defaultColumns: any = [
        {
            title: 'Item Description',
            dataIndex: 'Item Description',
            width: '30%',
            editable: true,
        },
        {
            title: 'Price',
            dataIndex: 'Price',
            editable: true,
        },
        {
            title: 'Quantity',
            dataIndex: 'Quantity',
            editable: true,
        },
        {
            title: 'Total',
            dataIndex: 'Total',
            render: (_: any, record: { key: React.Key, Price: number, Quantity: number }) => {
                console.log("Total record***", record);

                return (
                    <span>{record.Price * record.Quantity}</span>
                )
            }
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (_: any, record: { key: React.Key }) =>
                dataSource.length >= 1 ? (
                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                        <a>Delete</a>
                    </Popconfirm>
                ) : null,
        },
    ];

    const handleAdd = () => {
        const newData: DataType = {
            key: count,
            "Item Description": 'Please Enter Item Description',
            Price: 0,
            Quantity: 0,
            Total: 0
        };
        setDataSource([...dataSource, newData]);
        setCount(count + 1);
    };

    const handleSave = (row: DataType) => {
        const newData = [...dataSource];
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        setDataSource(newData);
    };

    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };

    const columns = defaultColumns.map((col: any) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: DataType) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave,
            }),
        };
    });

    return (
        <div>
            <ConfigProvider
                theme={{
                    algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
                }}
            >
                <Table
                    pagination={false}
                    components={components}
                    rowClassName={() => 'editable-row'}
                    bordered
                    dataSource={dataSource}
                    columns={columns as ColumnTypes}
                />
                <Button onClick={handleAdd} type="primary" style={{ marginTop: 20 }} >
                    Add a row
                </Button>
            </ConfigProvider>

        </div>
    );
};

export default BillingTable;

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
    key: string;
    "Item Description": string;
    Price: number;
    Quantity: number;
    Total: number
}

interface EditableRowProps {
    index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

interface EditableCellProps {
    title: React.ReactNode;
    editable: boolean;
    children: React.ReactNode;
    dataIndex: keyof Item;
    record: Item;
    handleSave: (record: Item) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
}) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef<InputRef>(null);
    const form = useContext(EditableContext)!;
    const [currentVal, setCurrentVal] = useState<any>(null)

    useEffect(() => {
        if (editing) {
            inputRef.current!.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({ [dataIndex]: record[dataIndex] });
    };

    const save = async () => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            handleSave({ ...record, ...values });
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{ margin: 0 }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `${title} is required.`,
                    },
                ]}
            >
                <Input allowClear ref={inputRef} onPressEnter={save} onBlur={save}  onChange={(e)=>{setCurrentVal(e.target.value)}} value={currentVal} />
            </Form.Item>
        ) : (
            <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
                {children}
            </div>
        );
    }

    return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];

interface DataType {
    key: React.Key;
    "Item Description": string;
    Price: number;
    Quantity: number;
    Total: number
}

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;
