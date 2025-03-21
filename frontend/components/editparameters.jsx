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
  const [target, setTarget] = useState("")
  const [model, setModel] = useState("")
  const [task, setTask] = useState("")

  const handleChange = (type, value) => {
    switch(type) {
      case 'target':
        setTarget(value);
        break;
      case 'model':
        setModel(value);
        break;
      case 'task':
        setTask(value);
        break;
    }
    
    onParametersChange({
      target: type === 'target' ? value : target,
      model: type === 'model' ? value : model,
      task: type === 'task' ? value : task
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="lg" variant="outline" className="transition-all duration-200 hover:bg-slate-100 active:scale-95">
          Model Parameters
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[280px] p-4">
        <div className="space-y-4">
          <div className="flex items-center border-b pb-2">
            <h4 className="font-medium text-sm text-slate-600">Select Parameters</h4>
          </div>
          
          <div className="space-y-4">
            <Select onValueChange={(value) => handleChange('target', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Target" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="stage">Stage</SelectItem>
                <SelectItem value="subtype">Subtype</SelectItem>
                <SelectItem value="grade">Grade</SelectItem>
              </SelectContent>
            </Select>

            <Select onValueChange={(value) => handleChange('model', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="svm">SVM</SelectItem>
                <SelectItem value="vtfs">VTFS</SelectItem>
                <SelectItem value="saint">SAINT</SelectItem>
                <SelectItem value="random_forest">Random Forest</SelectItem>
              </SelectContent>
            </Select>

            <Select onValueChange={(value) => handleChange('task', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Task" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="classification">Classification</SelectItem>
                <SelectItem value="selection">Selection</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
