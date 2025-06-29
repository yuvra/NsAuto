"use client";
import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Card,
  InputNumber,
  Row as AntRow,
  Col,
  Upload,
  UploadProps,
  message,
} from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import "./BillingTable.css";

interface Row {
  key: number;
  description: string;
  quantity: number;
  price: number;
}

interface BillingTableProps {
  tableData: Row[];
  setTableData: (data: Row[]) => void;
}

const BillingTable: React.FC<BillingTableProps> = ({
  tableData: rows,
  setTableData: setRows,
}) => {
  const [count, setCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemList, setItemList] = useState<
    { name: string; price: number }[] | null
  >(null);
  const [modalData, setModalData] = useState<
    Record<string, { quantity: number; price: number }>
  >({});

  useEffect(() => {
    fetch("/itemList.json")
      .then((res) => res.json())
      .then(setItemList)
      .catch(() => {
        console.log("No itemList.json file found yet.");
      });
  }, []);

  const handleModalChange = (
    item: string,
    field: "quantity" | "price",
    value: number
  ) => {
    setModalData((prev) => ({
      ...prev,
      [item]: {
        ...prev[item],
        [field]: value,
      },
    }));
  };

  const incrementQty = (item: string) => {
    const current = modalData[item]?.quantity || 0;
    const defaultPrice = itemList?.find((i) => i.name === item)?.price || 100;
    handleModalChange(item, "quantity", current + 1);
    handleModalChange(item, "price", modalData[item]?.price ?? defaultPrice);
  };

  const decrementQty = (item: string) => {
    const current = modalData[item]?.quantity || 0;
    const defaultPrice = itemList?.find((i) => i.name === item)?.price || 100;
    handleModalChange(item, "quantity", Math.max(current - 1, 0));
    handleModalChange(item, "price", modalData[item]?.price ?? defaultPrice);
  };

  const handleDone = () => {
    const newRows = Object.entries(modalData)
      .map(([description, { quantity, price }]) => ({
        key: count + Math.random(),
        description,
        quantity,
        price: price || 100,
      }))
      .filter((row) => row.quantity > 0);

    setRows([...rows, ...newRows]);
    setModalData({});
    setIsModalOpen(false);
    setCount(count + newRows.length);
  };

  const handleDeleteRow = (key: number) => {
    setRows(rows.filter((row) => row.key !== key));
  };

  const handleEdit = (
    index: number,
    field: "quantity" | "price" | "description",
    value: number | string
  ) => {
    const updated = [...rows];
    if (field === "description") {
      updated[index][field] = value as string;
    } else {
      updated[index][field] = Number(value) || 0;
    }
    setRows(updated);
  };

  const handleAddCustomRow = () => {
    const newRow: Row = {
      key: count + Math.random(),
      description: "",
      quantity: 1,
      price: 0,
    };
    setRows([...rows, newRow]);
    setCount(count + 1);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.name.endsWith(".json")) {
      message.error("Please upload a valid .json file");
      return;
    }

    try {
      const text = await file.text();
      const parsed = JSON.parse(text);

      if (
        Array.isArray(parsed) &&
        parsed.every(
          (item) =>
            typeof item.name === "string" && typeof item.price === "number"
        )
      ) {
        setItemList(parsed);
        message.success("Loaded item list!");

        // Save to /public/itemList.json via API route
        const res = await fetch("/api/item-list", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(parsed),
        });

        if (!res.ok) throw new Error("Upload failed");
      } else {
        throw new Error("Invalid format");
      }
    } catch (err) {
      message.error("Invalid JSON or upload failed.");
    }
  };

  const grandTotal = rows.reduce(
    (acc, row) => acc + row.quantity * row.price,
    0
  );

  return (
    <div className="billing-container">
      <div style={{ display: "flex", gap: "10px", marginBottom: "16px" }}>
        <Button
          type="primary"
          onClick={() => setIsModalOpen(true)}
          disabled={!itemList}
        >
          Add Item from List
        </Button>
        <Button onClick={handleAddCustomRow}>Add Custom Row</Button>

        <input type="file" accept=".json" onChange={handleFileUpload} />
      </div>

      <table className="billing-table">
        <thead>
          <tr>
            <th>Item Description</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={row.key}>
              <td>
                <input
                  value={row.description}
                  onChange={(e) =>
                    handleEdit(index, "description", e.target.value)
                  }
                  className="editable-input"
                />
              </td>
              <td>
                <InputNumber
                  min={0}
                  value={row.quantity}
                  onChange={(value) =>
                    handleEdit(index, "quantity", value || 0)
                  }
                />
              </td>
              <td>
                <InputNumber
                  min={0}
                  value={row.price}
                  onChange={(value) => handleEdit(index, "price", value || 0)}
                />
              </td>
              <td>{row.quantity * row.price}</td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteRow(row.key)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="total-bar">
        <strong>Grand Total: ₹ {grandTotal}</strong>
      </div>

      <Modal
        title="Select Items"
        open={isModalOpen}
        onOk={handleDone}
        onCancel={() => setIsModalOpen(false)}
        width={900}
        bodyStyle={{ maxHeight: "70vh", overflowY: "auto" }}
      >
        <AntRow gutter={[16, 16]}>
          {itemList?.map(({ name, price }) => (
            <Col key={name} xs={24} sm={12} md={8}>
              <Card title={name} size="small" className="item-card">
                <div className="card-field">
                  <span>Quantity:</span>
                  <div className="qty-control">
                    <Button
                      icon={<MinusOutlined />}
                      onClick={() => decrementQty(name)}
                      size="small"
                    />
                    <span className="qty-display">
                      {modalData[name]?.quantity || 0}
                    </span>
                    <Button
                      icon={<PlusOutlined />}
                      onClick={() => incrementQty(name)}
                      size="small"
                    />
                  </div>
                </div>
                <div className="card-field" style={{ marginTop: 10 }}>
                  <span>Price:</span>
                  <InputNumber
                    min={0}
                    value={modalData[name]?.price ?? price}
                    onChange={(value) =>
                      handleModalChange(name, "price", value || 0)
                    }
                    style={{ width: "100%" }}
                    size="small"
                  />
                </div>
              </Card>
            </Col>
          ))}
        </AntRow>
      </Modal>
    </div>
  );
};

export default BillingTable;
