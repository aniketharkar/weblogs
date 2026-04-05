import { useState, useEffect } from "react";
import { Search, Calendar, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { addDays, subDays, format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { getModuleData } from "./api";

const typeOptions = [
  { value: "web", label: "Web" },
  { value: "mobile_cp2", label: "Mobile CP2" },
  { value: "mobile", label: "Mobile" },
  { value: "web_cp3", label: "Web CP3" },
];

export function FilterPanel({ onSearch }) {
  const [filters, setFilters] = useState({
    clientId: "",
    repcode: "",
    type: "",
    moduleType: "",
    date: new Date(),
  });

  const [moduleOptions, setModuleOptions] = useState([]);
  const [isLoadingModules, setIsLoadingModules] = useState(false);

  useEffect(() => {
    const fetchModules = async () => {
      if (!filters.clientId.trim()) {
        setModuleOptions([]);
        setFilters(prev => ({ ...prev, moduleType: "" }));
        return;
      }

      setIsLoadingModules(true);
      try {
        const { data, error } = await supabase.functions.invoke("get-modules", {
          body: { client_id: filters.clientId },
        });

        if (error) {
          console.error("Error fetching modules:", error);
          setModuleOptions([]);
          return;
        }

        if (data?.status === "0" && Array.isArray(data.modules)) {
          const options = data.modules.map(modulePath => {
            const parts = modulePath.split("/");
            const lastPart = parts[parts.length - 1];
            return {
              value: modulePath,
              label: lastPart,
            };
          });
          setModuleOptions(options);
        } else {
          setModuleOptions([]);
        }
      } catch (err) {
        console.error("Error fetching modules:", err);
        setModuleOptions([]);
      } finally {
        setIsLoadingModules(false);
      }
    };

    const timeoutId = setTimeout(fetchModules, 500);
    return () => clearTimeout(timeoutId);
  }, [filters.clientId]);

  const handleSearch = () => {
    onSearch(filters);
  };

  const {mutate:getModuleType}=useMutation({
    mutationFn:(data)=>getModuleData(data),
    onSuccess:(response)=>{
      console.log("response",response)
    }
  })



  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-xl border border-border p-4 sm:p-6 shadow-sm"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
        {/* Client ID */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">
            Client ID<span className="text-destructive">*</span>
          </Label>
          <Input
            placeholder="Enter Client ID"
            value={filters.clientId}
            onChange={e =>{
              debugger
              const client=e.target.value.toUpperCase();
              console.log("anikket on change working",client);
              setFilters({ ...filters, clientId: e.target.value.toUpperCase() })
            }
            }
            className="uppercase"
          />
        </div>

        {/* Repcode */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">
            Repcode <span className="text-destructive">*</span>
          </Label>
          <Input
            placeholder="Enter Repcode"
            value={filters.repcode}
            onChange={e =>
              setFilters({ ...filters, repcode: e.target.value })
            }
          />
        </div>

        {/* Type */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">
            Type <span className="text-destructive">*</span>
          </Label>
          <Select
            value={filters.type}
            onValueChange={value =>
              setFilters({ ...filters, type: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              {typeOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Date */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">
            Date <span className="text-destructive">*</span>
          </Label>
          <div className="flex gap-1">
            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                filters.date &&
                setFilters({ ...filters, date: subDays(filters.date, 1) })
              }
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "flex-1 justify-start text-left font-normal",
                    !filters.date && "text-muted-foreground"
                  )}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {filters.date
                    ? format(filters.date, "dd-MM-yyyy")
                    : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <CalendarComponent
                  mode="single"
                  selected={filters.date}
                  onSelect={date =>
                    setFilters({ ...filters, date })
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                filters.date &&
                setFilters({ ...filters, date: addDays(filters.date, 1) })
              }
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Module Type */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Module Type</Label>
          <Select
            value={filters.moduleType}
            onValueChange={value =>
              setFilters({ ...filters, moduleType: value })
            }
            disabled={isLoadingModules || moduleOptions.length === 0}
          >
            <SelectTrigger>
              {isLoadingModules ? (
                <div className="flex items-center">
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Loading...
                </div>
              ) : (
                <SelectValue
                  placeholder={
                    filters.clientId
                      ? "Select module"
                      : "Enter Client ID first"
                  }
                />
              )}
            </SelectTrigger>
            <SelectContent>
              {moduleOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Search Button */}
      <div className="mt-6">
        <Button onClick={handleSearch}>
          <Search className="h-4 w-4 mr-2" />
          Show Results
        </Button>
      </div>
    </motion.div>
  );
}
