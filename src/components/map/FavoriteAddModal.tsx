import { X } from "lucide-react";

export function FavoriteAddModal() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">즐겨찾기 추가</h2>
          <button>
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray600 mb-1">
            그룹 선택
          </label>
          <select
            className="w-full border border-gray-300  rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            defaultValue=""
          >
            <option value="" disabled>
              그룹을 선택해주세요.
            </option>
            <option value="group1">그룹 1</option>
            <option value="group2">그룹 2</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray600 mb-1">
            메모 <span className="text-gray600 text-xs">(Optional)</span>
          </label>
          <input
            type="text"
            placeholder="메모를 작성해주세요."
            className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        <div className="flex justify-end space-x-2">
          <button className="px-4 py-2 text-sm rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200">
            Close
          </button>
          <button className="px-4 py-2 text-sm rounded-md bg-purple-600 text-white hover:bg-purple-700">
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
