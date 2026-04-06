import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

const CATEGORY_OPTIONS = [
  { mcc: "5411", label: "Groceries" },
  { mcc: "5812", label: "Food & Dining" },
  { mcc: "4111", label: "Transport" },
  { mcc: "4900", label: "Utilities" },
  { mcc: "5311", label: "Shopping" },
  { mcc: "5912", label: "Medical" },
  { mcc: "7832", label: "Entertainment" },
  { mcc: "6513", label: "Rent / Real Estate" },
  { mcc: "6011", label: "Salary / Bank Transfer" },
  { mcc: "6012", label: "Investments" },
];

const DEFAULT_FORM = {
  description: "",
  amount: "",
  type: "expense",
  mcc: "5411",
  date: new Date().toISOString().split("T")[0],
};

export default function AddTransactionModal({ onClose, transactionToEdit = null }) {
  const { dispatch } = useContext(AppContext);
  const isEditMode = Boolean(transactionToEdit);

  const [form, setForm] = useState(() =>
    transactionToEdit
      ? {
          description: transactionToEdit.description,
          amount: String(transactionToEdit.amount),
          type: transactionToEdit.type,
          mcc: transactionToEdit.mcc,
          date: transactionToEdit.date,
        }
      : DEFAULT_FORM,
  );

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit() {
    if (!form.description || !form.amount || !form.date || !form.mcc) return;

    const nextTransaction = {
      id: transactionToEdit?.id ?? Date.now(),
      description: form.description.trim(),
      amount: Number(form.amount),
      type: form.type,
      date: form.date,
      mcc: form.mcc,
    };

    dispatch({
      type: isEditMode ? "EDIT_TRANSACTION" : "ADD_TRANSACTION",
      payload: nextTransaction,
    });

    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="mx-4 w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-base font-semibold text-slate-800 dark:text-white">
            {isEditMode ? "Edit Transaction" : "Add Transaction"}
          </h3>
          <button
            onClick={onClose}
            className="text-lg leading-none text-slate-400 hover:text-slate-600"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <div>
            <label className="mb-1 block text-xs text-slate-500">Description</label>
            <input
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="e.g. Swiggy, Salary"
              className="h-9 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-700 outline-none focus:border-blue-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs text-slate-500">Amount (₹)</label>
              <input
                name="amount"
                type="number"
                value={form.amount}
                onChange={handleChange}
                placeholder="e.g. 500"
                className="h-9 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs  text-slate-700 outline-none focus:border-blue-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs text-slate-500">Type</label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="h-9 w-full cursor-pointer rounded-xl border border-slate-200 bg-white px-3 text-xs  text-slate-700 outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs text-slate-500">Category</label>
              <select
                name="mcc"
                value={form.mcc}
                onChange={handleChange}
                className="h-9 w-full cursor-pointer rounded-xl border border-slate-200 bg-white px-3 text-xs  text-slate-700 outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
              >
                {CATEGORY_OPTIONS.map((option) => (
                  <option key={option.mcc} value={option.mcc}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-xs text-slate-500">Date</label>
              <input
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
                className="h-9 w-full cursor-pointer rounded-xl border border-slate-200 bg-white px-3 text-xs  text-slate-700 outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
              />
            </div>
          </div>
        </div>

        <div className="mt-5 flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-slate-200 py-2 text-sm text-slate-500 hover:bg-slate-50 dark:border-slate-700"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 rounded-xl bg-blue-600 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            {isEditMode ? "Save Changes" : "Add Transaction"}
          </button>
        </div>
      </div>
    </div>
  );
}
