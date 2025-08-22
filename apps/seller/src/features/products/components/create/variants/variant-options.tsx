"use client"

import {GripVertical, PlusCircle, Trash2} from "lucide-react"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {useVariantStore} from "@/stores/variant-store"
import VariantsTable from "./variants-table"

export default function VariantOptions() {
  const {
    options,
    addOption,
    updateOptionName,
    deleteOption,
    updateValue,
    deleteValue,
  } = useVariantStore()
  return (
    <>
      <div className="space-y-6">
        <div >
          <h2 className="text-lg font-semibold mb-2">Variants</h2>
          {options.map((option) => (
            <div key={option.id} className="space-y-4 mb-4 border p-3 rounded-lg" >
              <div className="flex items-center gap-2">
                <GripVertical className="size-5 text-gray-600" />
                <div className="flex-1">
                  <Label className="text-sm font-medium text-gray-700">Option name</Label>
                  <Input
                    value={option.name}
                    onChange={(e) => updateOptionName(option.id, e.target.value)}
                    className="mt-1"
                    placeholder="Enter option name"
                  />
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">Option values</Label>
                <div className="mt-2 space-y-2">
                  {option.values.map((value) => (
                    <div key={value.id} className="flex items-center">
                      <GripVertical className="w-4 h-4 text-gray-400 mx-1 " />
                      <Input
                        value={value.value}
                        onChange={(e) => updateValue(option.id, value.id, e.target.value)}
                        className="flex-1"
                        placeholder="Enter value"
                      />
                      {
                        option.values.length > 2 && value.value.trim() !== "" &&
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteValue(option.id, value.id)}
                          className="text-gray-400 hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      }
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center pt-4">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => deleteOption(option.id)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 "
                >
                  Delete
                </Button>
                <Button type="button" className="bg-gray-800 hover:bg-gray-900 text-white px-6">Done</Button>
              </div>
            </div>
          ))}

          <Button
            variant="ghost"
            onClick={addOption}
            type="button"
            className="w-full justify-start text-gray-600 hover:text-gray-800 hover:bg-gray-100 py-3 "
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            {options.length === 0 ? "Add option" : "Add another option"}
          </Button>
        </div>

        {/* Variants Table */}
        <VariantsTable />
      </div>
    </>
  )
}
