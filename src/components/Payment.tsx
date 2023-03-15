import { PayPalButtons } from "@paypal/react-paypal-js";
import React, { useState, useEffect } from "react";
import { api } from "~/utils/api";
import { useNextButtonDisableStore } from "../state/index";
import {
  useMealSelectionStore,
  useStudentStore,
  useStepStore,
} from "../state/index";

export const Payment: React.FC = () => {
  const { name, email } = useStudentStore();
  const { increment } = useStepStore();
  const { toggleState } = useNextButtonDisableStore();
  const { total, mealSelection } = useMealSelectionStore();
  const [orderNumber, setOrderNumber] = useState("");
  const emailMutation = api.example.sendEmail.useMutation({
    onSuccess: () => {
      increment();
    },
  });
  const createOrderMutation = api.example.approveOrder.useMutation({
    onSuccess: (data) => {
      if (data.status === "success") {
        // do something
        console.log("🚀 ~ file: Payment.tsx:13 ~ success");
        emailMutation.mutate({
          buyersEmail: email,
          total: total(),
          orderNumber,
          orders: mealSelection.map((each) => ({
            date: each.date,
            dish: !each.dish
              ? null
              : {
                  name: each.dish.name,
                  price: each.dish.price,
                },
            protein: !each.protein
              ? null
              : {
                  name: each.protein.name,
                  price: each.protein.price,
                },
          })),
        });
      }
    },
  });

  const handleApproveOrder = (
    id: string,
    payment_status:
      | "COMPLETED"
      | "SAVED"
      | "APPROVED"
      | "VOIDED"
      | "PAYER_ACTION_REQUIRED"
  ) => {
    // save transaction information
    createOrderMutation.mutate({
      id,
      payment_status,
      name,
      email,
      subtotal: total(),
      total: total() * 1.13,
      order: mealSelection.map((e) => ({
        date: e.date,
        dish: e.dish?.name || null,
        protein: e.protein?.name || null,
      })),
    });
  };

  useEffect(() => {
    toggleState(true);
  }, [toggleState]);
  return (
    <>
      <div className="card w-96 overflow-scroll bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Payment</h2>
          <p>Subtotal: {total().toFixed(2)}</p>
          <p>HST: {(total() * 0.13).toFixed(2)}</p>
          <p className="font-bold">Total: {(total() * 1.13).toFixed(2)}</p>
          <div className="z-0">
            <PayPalButtons
              style={{}}
              createOrder={async (data, action) => {
                return action.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: (total() * 1.13).toFixed(2),
                      },
                    },
                  ],
                });
              }}
              onApprove={async (data, action) => {
                if (action.order) {
                  const order = await action.order.capture();
                  setOrderNumber(order.id);
                  handleApproveOrder(order.id, order.status);
                }
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};
