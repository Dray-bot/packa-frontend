"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function ShipmentTable() {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShipments = async () => {
      try {
        const response = await api.get("/api/shipments");

        setShipments(response.data);
      } catch (error) {
        console.log("Error fetching shipments", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShipments();
  }, []);

  if (loading) {
    return (
      <div className="mt-8 text-neutral-500">
        Loading shipments...
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-3xl border border-neutral-200 bg-white">
      <table className="w-full">
        <thead className="border-b border-neutral-200">
          <tr>
            <th className="text-left p-5">
              Tracking ID
            </th>

            <th className="text-left p-5">
              Sender
            </th>

            <th className="text-left p-5">
              Receiver
            </th>

            <th className="text-left p-5">
              Status
            </th>
          </tr>
        </thead>

        <tbody>
          {shipments.map((shipment) => (
            <tr
              key={shipment.id}
              className="border-b border-neutral-100"
            >
              <td className="p-5 font-medium">
                {shipment.tracking_id}
              </td>

              <td className="p-5">
                {shipment.sender_name}
              </td>

              <td className="p-5">
                {shipment.receiver_name}
              </td>

              <td className="p-5">
                <span className="px-4 py-2 rounded-full bg-neutral-100">
                  {shipment.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}