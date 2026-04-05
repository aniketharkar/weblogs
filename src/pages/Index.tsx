import { useState } from "react";
import { format, addDays, subDays } from "date-fns";
import { Calendar as CalendarIcon, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { useMutation } from "@tanstack/react-query";
import { FiUsers } from "react-icons/fi";
import { CiCalendarDate } from "react-icons/ci";
import { VscFileSubmodule } from "react-icons/vsc";
import { PiUserCircleThin } from "react-icons/pi";
import { TfiWorld } from "react-icons/tfi";
import { IoCodeSlashOutline } from "react-icons/io5";
import { getModuleData, getLogsData } from "./api";
import { message } from "antd";
import dayjs from "dayjs";

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
import { cn } from "@/lib/utils";

const clients = [
  { key: "Select", value: "Select" },
  { key: "MEDTECH", value: "MEDTECH (MEDTECH)" },
  { key: "HIGEN", value: "HIGEN (HIGEN)" },
  { key: "ZUELLIG", value: "ZUELLIG (ZUELLIG)" },
  { key: "PGINT", value: "PGINT (PGINT)" },
  { key: "VIVALDIS", value: "VIVALDIS (VIVALDIS)" },
  { key: "ELANCO", value: "ELANCO (ELANCO)" },
  { key: "SUNK", value: "SUNKONNECT (SUNK)" },
  { key: "GMEM", value: "GLMRKEM (GMEM)" },
  { key: "AUROGEN", value: "AUROBINDOIDN (AUROGEN)" },
  { key: "ZENEX", value: "ZENEX (ZENEX)" },
  { key: "EISAI", value: "EISAI (EISAI)" },
  { key: "SDPL", value: "SUNGX (SDPL)" },
  { key: "APL", value: "AUROBINDO (APL)" },
  { key: "MEGA", value: "MEGACARE (MEGA)" },
  { key: "ZYDI", value: "ZYDINTL (ZYDI)" },
  { key: "BAYER", value: "BAYER (BAYER)" },
  { key: "CIPI", value: "CIPLAINTL (CIPI)" },
  { key: "CHC", value: "CHC (CHC)" },
  { key: "AJANTA", value: "AJANTA (AJANTA)" },
  { key: "HUL", value: "HUL (HUL)" },
  { key: "ALCP2", value: "ALEMBIC (ALCP2)" },
  { key: "KENVUE", value: "KENVUE (KENVUE)" },
  { key: "SUNEM2", value: "SUNEM (SUNEM2)" },
  { key: "PGHL", value: "PNG (PGHL)" },
  { key: "DRL", value: "DRL (DRL)" },
  { key: "DANONE", value: "DANONE (DANONE)" },
  { key: "ARCP2", value: "ARISTOCP2 (ARCP2)" },
  { key: "JBCPL", value: "JBCPL (JBCPL)" },
  { key: "GLENMARK", value: "GLMRKIND (GLENMARK)" },
  { key: "USV", value: "USV (USV)" },
  { key: "CADILA", value: "CADILA (CADILA)" },
  { key: "SUN", value: "SUNPHARMA (SUN)" },
  { key: "CIPLA", value: "CIPLAIPAD (CIPLA)" },
  { key: "SUNEM1", value: "SUNRD (SUNEM1)" },
  { key: "SUNEM3", value: "SUNROTC (SUNEM3)" }
];

const environments = [
  { id: "live", name: "LIVE", icon: <TfiWorld className="me-1" /> },
  { id: "dev", name: "DEV", icon: <IoCodeSlashOutline className="me-1" /> }
];

const NewLogs = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isCustomClientMode, setIsCustomClientMode] = useState(false);

    const [fetchedLogsCount, setFetchedLogsCount] = useState(0);

  const [date, setDate] = useState(new Date());
  const [repCode, setRepCode] = useState("");
  const [clientId, setClientId] = useState("Select");
  const [environment, setEnvironment] = useState("live");
  const [moduletype, setModuleType] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const [messageApi, contextHolder] = message.useMessage();
  const [moduledata, setModuledata] = useState([]);
  const [allLogs, setAllLogs] = useState<any[]>([]); // Collect all logs here

  const liveActions = [
    { label: "Web", variant: "primary", value: "web" },
    { label: "Web CP3", variant: "primary", value: "web_cp3" },
    { label: "Device CP3", variant: "primary", value: "device_CP3" },
    { label: "Mobile CP2", variant: "primary", value: "mobile_cp2" },
    { label: "Custom ClientID", variant: "primary", value: "Custom ClientID" }
  ];

  const localActions = [
    { label: "Web", variant: "primary", value: "web" },
    { label: "Web CP3", variant: "primary", value: "web_cp3" },
    { label: "Device CP3", variant: "primary", value: "device_CP3" },
    { label: "Mobile CP2", variant: "primary", value: "mobile_cp2" },
    { label: "Custom ClientID", variant: "primary", value: "Custom ClientID" }
  ];

  const isLiveEnvironment = environment === "live";
  const quickActions = isLiveEnvironment ? liveActions : localActions;

  const handlePrevDay = () => setDate(subDays(date, 1));
  const handleNextDay = () => setDate(addDays(date, 1));

  const handlePrevModule = () => {
    const currentIndex = moduledata.findIndex(c => c.value === moduletype);
    if (currentIndex > 0) {
      handleModuleTypeChange(moduledata[currentIndex - 1].value);
    } else if (currentIndex === -1 && moduledata.length > 0) {
      handleModuleTypeChange(moduledata[moduledata.length - 1].value);
    }
  };

  const handleNextModule = () => {
    const currentIndex = moduledata.findIndex(c => c.value === moduletype);
    if (currentIndex < moduledata.length - 1) {
      handleModuleTypeChange(moduledata[currentIndex + 1].value);
    } else if (moduledata.length > 0) {
      handleModuleTypeChange(moduledata[0].value);
    }
  };

  const handlePrevClient = () => {
    const currentIndex = clients.findIndex(c => c.key === clientId);
    if (currentIndex > 0) {
      handleClientIdChange(clients[currentIndex - 1].key);
    } else if (currentIndex === -1 && clients.length > 0) {
      handleClientIdChange(clients[clients.length - 1].key);
    }
  };

  const handleNextClient = () => {
    const currentIndex = clients.findIndex(c => c.key === clientId);
    if (currentIndex < clients.length - 1) {
      handleClientIdChange(clients[currentIndex + 1].key);
    } else {
      handleClientIdChange(clients[0].key);
    }
  };

  type LogsPayload = {
    clientId: string;
    repCode: string;
    action: string;
    date: Date;
    moduletype: string;
    environment: string;
    search_after: string[] | null;
  };

  function safeFormat(str: any) {
    try {
      if (typeof str === "string") {
        return JSON.stringify(JSON.parse(str), null, 2);
      }
      return JSON.stringify(str, null, 2);
    } catch {
      return str;
    }
  }

  const formatIST = (timestamp: string | number) => {
    return new Date(timestamp).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  };

  const downloadLogsAsTxt = (logs: any[]) => {
    if (!logs || logs.length === 0) {
      messageApi.info("No logs found to download");
      return;
    }

    let fullContent = "";

    logs.forEach((log) => {
      let logEntry = "";

      if (log?.type?.includes("web")) {
        const request = log?.message?.Request
          ? safeFormat(log.message.Request)
          : "No message";
        const response = log?.message?.Response
          ? safeFormat(log.message.Response)
          : "No message";

        logEntry = `TIMESTAMP: ${formatIST(log.timestamp)}\n` +
                   `MODULE: ${log.module}\n` +
                   `REQUEST: ${request}\n\n` +
                   `RESPONSE: ${response}\n` +
                   "=====================================================================================================================================================================================================================\n\n";
      } else {
        const msg = log.message?.[0] ? log.message : "No message";
        logEntry = `Timestamp: ${formatIST(log.timestamp)}\n` +
                   `Module: ${log.module}\n` +
                   `Message: ${msg}\n`+
                    "===================================================================================================================================================================================================================\n\n"
      }

      fullContent += logEntry;
    });

    const filename = `${clientId}_${repCode}_${dayjs(date).format("YYYY-MM-DD")}.txt`;

    const blob = new Blob([fullContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    messageApi.success("Logs downloaded successfully!");
  };

    const resetFetchState = () => {
    setIsLoading(false);
    setAllLogs([]);
    setFetchedLogsCount(0);
    setStatusMessage("");
  };

   const { mutate: getLogs } = useMutation({
    mutationFn: (data: LogsPayload) => getLogsData(data),

    // onMutate: () => {
    //   setIsLoading(true);
    //   setStatusMessage("Fetching logs...");
    //   setFetchedLogsCount(0);        
    // },

    onSuccess: async (response, payload) => {
      let updatedLogs=[];
      const newLogs = response?.responseData || [];
      setAllLogs((prevLogs) => {
    updatedLogs = [...prevLogs, ...newLogs];
  setFetchedLogsCount(updatedLogs.length);
  return updatedLogs;
});

      if (response?.searchAfter?.length > 0) {
  setStatusMessage(`Fetching more logs... (${updatedLogs.length} logs fetched so far)`);

  setTimeout(() => {
    getLogs({
      ...payload,
      search_after: response.searchAfter,
    });
  }, 0); 
} else {
        setStatusMessage(`All logs fetched (${updatedLogs.length} total). Preparing download...`);
        
        setTimeout(() => {
          downloadLogsAsTxt(updatedLogs);
          resetFetchState();                
        }, 500);
      }
    },

    onError: (error) => {
      console.error("Logs error", error);
      resetFetchState();
      messageApi.error("Failed to fetch logs");
    },
  });

  const handleActionClick = async (action: string) => {
  if (action === "Custom ClientID") {
    setIsCustomClientMode(!isCustomClientMode);
    return;
  }

  if (clientId.includes("Select")) {
    messageApi.info("Please select ClientId");
    return;
  }
  if (!repCode) {
    messageApi.info("Please enter Repcode");
    return;
  }

  setAllLogs([]);
  setIsLoading(true);
  setStatusMessage("Fetching logs...");

  const payload: LogsPayload = {
    clientId,
    repCode,
    action,
    date,
    moduletype,
    environment,
    search_after: null,
  };

  getLogs(payload);
};

  const { mutate: getModuleType } = useMutation({
    mutationFn: (data: any) => getModuleData(data),
    onSuccess: (response) => {
      const result = response?.data;
      if (result?.length > 0) {
        messageApi.success(`Module Type Found for ${clientId}`);
        const result2 = result?.map((item: string) => {
          const split = item.split("/");
          return {
            label: split[split.length - 1],
            value: item,
            key: split[split.length - 1]
          };
        });
        setModuledata([{ label: "Select", key: "Select", value: null }, ...result2]);
      } else {
        console.log(`No module type found for ${clientId}`);
      }
    },
    onError: (error) => {
      messageApi.error(error.message);
    }
  });

  const handleClientIdChange = (clientid: string) => {
    if (clientid?.length >= 3) {
      getModuleType({clientid,environment});
    }
     if(clientid.includes("KENVUE")){
      messageApi.info("Please select module type for faster result!");
    }
    setClientId(clientid);
  };

  const handleModuleTypeChange = (type: string) => {
    setModuleType(type);
  };

  return (
    <div className="flex min-h-screen bg-background relative">
      {contextHolder}
      <AppSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <Header title="New Logs" onMenuClick={() => setSidebarOpen(true)} />

        <main className="mt-5 flex flex-col justify-center items-center px-4 py-2 pt-5 md:px-10">
          <h1 className="text-3xl md:text-3xl font-bold text-primary tracking-wide bg-gradient-to-r mb-3">
            USER LOGS
          </h1>

          <div className={`w-full max-w-[95%] xl:max-w-[1400px] 2xl:max-w-[1700px] mx-auto bg-card border border-border shadow-md rounded-xl p-6 md:p-10 space-y-5 transition-all duration-300 ${isLoading ? 'blur-sm pointer-events-none' : ''}`}>
            
            {/* Row 1: Client ID + Sort Buttons + Date + Date Nav */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr_auto] gap-4 items-end">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground flex uppercase tracking-wide">
                  <FiUsers className="me-1" /> Client ID {isCustomClientMode && "(Custom)"}
                </label>
                {isCustomClientMode ? (
                  <Input
                    value={clientId}
                    onChange={(e) => handleClientIdChange(e.target.value)}
                    placeholder="Enter Custom Client ID"
                    className="h-11 w-full bg-card border-primary/30 focus:border-primary placeholder:text-primary/50"
                    disabled={isLoading}
                  />
                ) : (
                  <Select
                    value={clientId}
                    onValueChange={handleClientIdChange}
                    disabled={isLoading}
                  >
                    <SelectTrigger className="w-full h-11 bg-card border-primary/30 focus:border-primary">
                      <SelectValue placeholder="Select Client" />
                    </SelectTrigger>
                    <SelectContent className="max-h-80 bg-popover border-border">
                      {clients.map((client) => (
                        <SelectItem key={client.key} value={client.key}>
                          {client.value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>

              {!isCustomClientMode && (
                <div className="flex gap-1">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handlePrevClient}
                    className="h-11 w-11 border-primary/30"
                    disabled={isLoading}
                    title="Previous Client"
                  >
                    <ChevronUp className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleNextClient}
                    className="h-11 w-11 border-primary/30"
                    disabled={isLoading}
                    title="Next Client"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium flex text-muted-foreground uppercase tracking-wide">
                  <CiCalendarDate className="me-1 text-xl" /> Date
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full h-11 justify-start text-left font-normal border-primary/30 bg-card"
                      disabled={isLoading}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {format(date, "dd/MM/yyyy")}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-popover border-border" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(d) => d && setDate(d)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handlePrevDay}
                  className="h-11 w-11 border-primary/30"
                  disabled={isLoading}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleNextDay}
                  className="h-11 w-11 border-primary/30"
                  disabled={isLoading}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Row 2: Module Type + Rep Code + Environment */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr_auto] gap-4 items-end">
              <div className="space-y-2">
                <label className="text-sm font-medium flex text-muted-foreground uppercase tracking-wide">
                  <VscFileSubmodule className="me-1 " />Module Type
                </label>
                <Select
                  disabled={!clientId || isLoading}
                  value={moduletype}
                  onValueChange={handleModuleTypeChange}
                >
                  <SelectTrigger className="w-full h-11 bg-card border-primary/30 focus:border-primary">
                    <SelectValue placeholder="Select Module Type" />
                  </SelectTrigger>
                  <SelectContent className="max-h-80 bg-popover border-border">
                    {moduledata?.map((type: any) => (
                      <SelectItem key={type.key} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handlePrevModule}
                  className="h-11 w-11 border-primary/30"
                  disabled={isLoading}
                  title="Previous Type"
                >
                  <ChevronUp className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleNextModule}
                  className="h-11 w-11 border-primary/30"
                  disabled={isLoading}
                  title="Next Type"
                >
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground flex uppercase tracking-wide">
                  <PiUserCircleThin className="me-1 text-xl" /> Repcode Code
                </label>
                <Input
                  value={repCode}
                  onChange={(e) => setRepCode(e.target.value)}
                  placeholder="Enter Repcode Code"
                  className="h-11 bg-card border-primary/30 focus:border-primary placeholder:text-primary/50"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                  Environment
                </label>
                <Select value={environment} onValueChange={setEnvironment} disabled={isLoading}>
                  <SelectTrigger className="w-full h-11 bg-card border-primary/30 focus:border-primary">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    {environments.map((env) => (
                      <SelectItem key={env.id} value={env.id}>
                        <div className="flex items-center gap-2">
                          {env.icon} {env.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="pt-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    onClick={() => handleActionClick(action.value)}
                    disabled={isLoading}
                    className={cn(
                      "h-12 font-medium text-sm transition-all duration-200",
                      action.variant === "primary"
                        ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                        : "bg-primary/20 hover:bg-primary/30 text-primary border border-primary/40",
                    )}
                  >
                    {action.label.includes("Custom ClientID")
                      ? isCustomClientMode
                        ? "Switch To ClientID List"
                        : action.label
                      : action.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* ====================== FULL SCREEN LOADER ====================== */}
                   {/* ====================== FULL SCREEN LOADER ====================== */}
          {isLoading && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md">
              <div className="flex flex-col items-center gap-6">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-primary/30 rounded-full"></div>
                  <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
                </div>

                <div className="text-center">
                  <p className="text-xl font-semibold text-white mb-1">
                    {statusMessage}
                  </p>
                  {fetchedLogsCount > 0 && (
                    <p className="text-lg font-medium text-primary">
                      Fetched: {fetchedLogsCount} logs
                    </p>
                  )}
                  <p className="text-sm text-white/70 mt-2">
                    Please wait, do not close the tab
                  </p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default NewLogs;