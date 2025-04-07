import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react"

export default function EditParams({ onParametersChange }) {
  const [model, setModel] = useState("")

  const handleChange = (type, value) => {
    switch(type) {
      case 'model':
        setModel(value);
        break;
    }
    
    onParametersChange({
      model: type === 'model' ? value : model,
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="lg" variant="outline" className="transition-all duration-200 hover:bg-slate-100 active:scale-95">
          Models
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[280px] p-4">
        <div className="space-y-4">
          <div className="flex items-center border-b pb-2">
            <h4 className="font-medium text-sm text-slate-600">Select Model</h4>
          </div>
       
          <div className="space-y-4">
            <Select onValueChange={(value) => handleChange('model', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="svm">SVM</SelectItem>
                <SelectItem value="saint">SAINT</SelectItem>
                <SelectItem value="random_forest">Random Forest</SelectItem>
              </SelectContent>
            </Select>
          </div>

        </div>
      </PopoverContent>
    </Popover>
  )
}
