import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Info } from "lucide-react"

export default function EditParams() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="lg" variant="outline" className="transition-all duration-200 hover:bg-slate-100 active:scale-95">
          Select Model
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[280px] p-4">
        <div className="space-y-4">
          <div className="flex items-center border-b pb-2">
            <h4 className="font-medium text-sm text-slate-600">Select Model</h4>
          </div>
          <RadioGroup defaultValue="svm" className="gap-2">
            <div className="flex items-center justify-between rounded-lg border border-transparent p-3 hover:bg-slate-50 hover:border-slate-200 data-[state=checked]:bg-slate-50 data-[state=checked]:border-slate-200 transition-all duration-200">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="svm" id="svm" className="data-[state=checked]:border-slate-800 data-[state=checked]:text-slate-800" />
                <Label htmlFor="svm" className="text-sm font-medium cursor-pointer select-none">SVM</Label>
              </div>
              <TooltipProvider delayDuration={200}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-slate-100 transition-colors">
                      <Info className="h-4 w-4 text-slate-600" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-slate-900 text-slate-50">
                    <p className="w-[200px] text-xs">Support Vector Machine (SVM) is a supervised learning algorithm that separates data points using hyperplanes, effective for both classification and regression tasks.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-transparent p-3 hover:bg-slate-50 hover:border-slate-200 data-[state=checked]:bg-slate-50 data-[state=checked]:border-slate-200 transition-all duration-200">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="random_forest" id="random_forest" className="data-[state=checked]:border-slate-800 data-[state=checked]:text-slate-800" />
                <Label htmlFor="random_forest" className="text-sm font-medium cursor-pointer select-none">Random Forest</Label>
              </div>
              <TooltipProvider delayDuration={200}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-slate-100 transition-colors">
                      <Info className="h-4 w-4 text-slate-600" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-slate-900 text-slate-50">
                    <p className="w-[200px] text-xs">Random Forest is an ensemble learning method that constructs multiple decision trees and outputs the class that is the mode of the classes of individual trees.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-transparent p-3 hover:bg-slate-50 hover:border-slate-200 data-[state=checked]:bg-slate-50 data-[state=checked]:border-slate-200 transition-all duration-200">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="saint" id="saint" className="data-[state=checked]:border-slate-800 data-[state=checked]:text-slate-800" />
                <Label htmlFor="saint" className="text-sm font-medium cursor-pointer select-none">SAINT</Label>
              </div>
              <TooltipProvider delayDuration={200}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-slate-100 transition-colors">
                      <Info className="h-4 w-4 text-slate-600" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-slate-900 text-slate-50">
                    <p className="w-[200px] text-xs">Self-Attention and Intersample Attention Transformer (SAINT) is a neural network architecture that uses transformers to process tabular data with both numerical and categorical features.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </RadioGroup>
        </div>
      </PopoverContent>
    </Popover>
  )
}
