import { useState, useEffect } from "react";
import { format, addDays, subDays } from "date-fns";
import { Calendar as CalendarIcon, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
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

const OldLogs = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Main states
  const [isCustomClientMode, setIsCustomClientMode] = useState(false);
  const [customClientId, setCustomClientId] = useState("");
  const [selectedClient, setSelectedClient] = useState("danone");
  const [date, setDate] = useState(new Date());
  const [repCode, setRepCode] = useState("");
  const [environment, setEnvironment] = useState<"live" | "local">("live");
  const [localEnvType, setLocalEnvType] = useState<"storageGP" | "local5.0" | "preENV">("storageGP");

  // Client Lists
  const liveClients = [
    { value: "danone", text: "DANONE (danone)" },
    { value: "hul", text: "HUL (hul)" },
    { value: "sun", text: "SUN PHARMA (sun)" },
    { value: "cipla", text: "CIPLA (cipla)" },
    { value: "ajanta", text: "AJANTA PHARMA (ajanta)" },
    { value: "cipi", text: "CIPLA INTERNATIONAL (cipi)" },
    { value: "hulcp3", text: "HULCP3 (hulcp3)" },
    { value: "glenmark", text: "GLENMARK (glenmark)" },
    { value: "usv", text: "USV (usv)" },
    { value: "sunem2", text: "SUN EMERGING (sunem2)" },
    { value: "cadila", text: "CADILA (cadila)" },
    { value: "apl", text: "AUROBINDO (apl)" },
    { value: "drl", text: "DR. REDDY (drl)" },
    { value: "alcp2", text: "ALEMBIC (alcp2)" },
    { value: "jbcpl", text: "JBCPL (jbcpl)" },
    { value: "chc", text: "SUN CHC (chc)" },
    { value: "gmem", text: "GLEM (gmem)" },
    { value: "biotics", text: "BIOTICS (biotics)" },
    { value: "inzpera", text: "INZPERA HEALTH (inzpera)" },
    { value: "pghl", text: "PNG (pghl)" },
    { value: "arcp2", text: "ARISTO PHARMA (arcp2)" },
    { value: "aurogen", text: "AURO INDONESIA (aurogen)" },
    { value: "metr", text: "METROPOLIS (metr)" },
    { value: "sdpl", text: "SOFTDEAL PRIVATE (sdpl)" },
    { value: "bayer", text: "BAYER (bayer)" },
    { value: "higen", text: "HIGEN (higen)" },
    { value: "thyrocare", text: "THYROCARE (thyrocare)" },
    { value: "cadvet", text: "VETNOVA (cadvet)" },
    { value: "mega", text: "MEGACARE (mega)" },
    { value: "sunem1", text: "SUNRD (sunem1)" },
    { value: "sunem3", text: "SUN RUSSIA OTC (sunem3)" },
    { value: "cpc", text: "CPC DIAGNOSTIC (cpc)" },
    { value: "enbcl", text: "EMERCHEMIE (enbcl)" },
    { value: "zintl", text: "ZINTL (zintl)" },
    { value: "zydi", text: "ZYDUS (zydi)" },
    { value: "vapt", text: "VAPT (vapt)" },
    { value: "hem", text: "HEMAS (hem)" },
    { value: "eisai", text: "EISAI (eisai)" },
    { value: "elanco", text: "ELANCO (elanco)" },
    { value: "kenvue", text: "KENVUE (kenvue)" },
    { value: "medtech", text: "MEDTECH (medtech)" },
  ];

  const localClients = [
    { value: "uat", text: "UAT (uat)" },
    { value: "ajantacp3", text: "AJANTACP3 (ajantacp3)" },
    { value: "uc3", text: "UC3 (uc3)" },
    { value: "uatsunem", text: "UATSUNEM (uatsunem)" },
    { value: "cp3dev", text: "CP3DEV (cp3dev)" },
    { value: "uatcp3", text: "UATCP3 (uatcp3)" },
    { value: "hulpre", text: "HULPRE (hulpre)" },
    { value: "hulcp3", text: "HULCP3 (hulcp3)" },
    { value: "suncp3", text: "SUNCP3 (suncp3)" },
    { value: "gmlo", text: "GMLO (gmlo)" },
    { value: "sunuat", text: "SUNUAT (sunuat)" },
    { value: "sunind", text: "SUNDEV (sunind)" },
    { value: "cipq", text: "CIPQ (cipq)" },
    { value: "jbcpl", text: "JBCPL LOCAL (jbcpl)" },
    { value: "usv", text: "USV LOCAL (usv)" },
    { value: "chcdev", text: "CHCDEV (chcdev)" },
    { value: "bayer", text: "BAYER LOCAL (bayer)" },
    { value: "almcp2", text: "ALEMBIC LOCAL (almcp2)" },
    { value: "gluat", text: "GLUAT (gluat)" },
    { value: "huluat", text: "HULUAT (huluat)" },
    { value: "ciplauat", text: "CIPLAUAT (ciplauat)" },
    { value: "chc1", text: "CHC1 (chc1)" },
    { value: "sunemuat", text: "SUNEMUAT (sunemuat)" },
    { value: "sunrdev", text: "SUNRDEV (sunrdev)" },
    { value: "ajdev", text: "AJDEV (ajdev)" },
    { value: "cp3", text: "CP3 (cp3)" },
    { value: "dcp3", text: "DCP3 (dcp3)" },
    { value: "cad", text: "CADILA LOCAL (cad)" },
    { value: "sunem3uat", text: "SUNEM3UAT (sunem3uat)" },
    { value: "uldev", text: "ULDEV (uldev)" },
    { value: "drlpre", text: "DRLPRE (drlpre)" },
    { value: "uathul", text: "UATHUL (uathul)" },
    { value: "uatdrl", text: "UATDRL (uatdrl)" },
    { value: "ciplapre", text: "CIPLAPRE (ciplapre)" },
    { value: "uatcipla", text: "UATCIPLA (uatcipla)" },
    { value: "uatjbcpl", text: "UATJBCPL (uatjbcpl)" },
    { value: "jbcplpre", text: "JBCPLPRE (jbcplpre)" },
    { value: "uatglmrk", text: "UATGLMRK (uatglmrk)" },
    { value: "glmrkpre", text: "GLMRKPRE (glmrkpre)" },
    { value: "ajantapre", text: "AJANTAPRE (ajantapre)" },
    { value: "uatajanta", text: "UATAJANTA (uatajanta)" },
    { value: "uatdanone", text: "UATDANONE (uatdanone)" },
    { value: "danonepre", text: "DANONEPRE (danonepre)" },
  ];

  const localEnvOptions = [
    { value: "storageGP", text: "STORAGE GP / QC ENV" },
    { value: "local5.0", text: "LOCAL 5.0" },
    { value: "preENV", text: "PRE ENV" },
  ];

  const currentClients = environment === "live" ? liveClients : localClients;

  const getCurrentClientId = () => {
    return isCustomClientMode 
      ? customClientId.trim().toLowerCase() 
      : selectedClient;
  };

  const formatDateForURL = (d: Date): string => format(d, "dd-MM-yyyy");
 const formatDateForAPIURL = (date) => {
  const d = new Date(date);
  return `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
};

  const showAlert = (message: string) => {
    alert(message);
  };

  const logsDownload = (deviceType: string) => {
    const param1Value = getCurrentClientId();
    if (!param1Value) {
      showAlert("Please enter/select a Client ID");
      return;
    }

    const param2Value = formatDateForURL(date);
    const param3Value = repCode.trim().toUpperCase();
    const param4Value = formatDateForAPIURL(date);
    const param5Value = localEnvType;

    const liveURL = "https://cirriusindiacentralstor.blob.core.windows.net";
    const uatURL = "https://storagegpworker.blob.core.windows.net";
    const preURL = "https://storageaccountuat2.blob.core.windows.net";
    const localURL = "https://cirrdevstore.blob.core.windows.net";
    const sunIntURL = "https://blobstoragegm.blob.core.windows.net";

    const connectURL = "images/txnsgp/devicelog";
    const txtURL = ".txt";
    const cp3 = "cp3";
    const androidURL = "android";
    const apiUrlPath = "apilogs";
    const upwURL = "UPW";

    let dynamicUrl = "";
    const isSunEm = param1Value === "sunem1" || param1Value === "sunem3";
    const isLive = environment === "live";

    if (deviceType === "iOSCP3") {
      if (isLive) {
        dynamicUrl = `${liveURL}/${param1Value}/${cp3}/${connectURL}/${param2Value}/${param3Value}${txtURL}`;
      } else {
        if (param5Value === "storageGP") dynamicUrl = `${uatURL}/${param1Value}/${cp3}/${connectURL}/${param2Value}/${param3Value}${txtURL}`;
        else if (param5Value === "local5.0") dynamicUrl = `${localURL}/${param1Value}/${cp3}/${connectURL}/${param2Value}/${param3Value}${txtURL}`;
        else if (param5Value === "preENV") dynamicUrl = `${preURL}/${param1Value}/${cp3}/${connectURL}/${param2Value}/${param3Value}${txtURL}`;
      }
    } 
    else if (deviceType === "iOS") {
      if (isLive) {
        dynamicUrl = isSunEm 
          ? `${sunIntURL}/${param1Value}/${connectURL}/${param2Value}/${param3Value}${txtURL}`
          : `${liveURL}/${param1Value}/${connectURL}/${param2Value}/${param3Value}${txtURL}`;
      } else {
        if (param5Value === "storageGP") dynamicUrl = `${uatURL}/${param1Value}/${connectURL}/${param2Value}/${param3Value}${txtURL}`;
        else if (param5Value === "local5.0") dynamicUrl = `${localURL}/${param1Value}/${connectURL}/${param2Value}/${param3Value}${txtURL}`;
        else if (param5Value === "preENV") dynamicUrl = `${preURL}/${param1Value}/${connectURL}/${param2Value}/${param3Value}${txtURL}`;
      }
    } 
    else if (deviceType === "Android") {
      if (isLive) {
        dynamicUrl = isSunEm 
          ? `${sunIntURL}/${param1Value}/${connectURL}/${androidURL}/${param2Value}/${param3Value}${txtURL}`
          : `${liveURL}/${param1Value}/${connectURL}/${androidURL}/${param2Value}/${param3Value}${txtURL}`;
      } else {
        if (param5Value === "storageGP") dynamicUrl = `${uatURL}/${param1Value}/${connectURL}/${androidURL}/${param2Value}/${param3Value}${txtURL}`;
        else if (param5Value === "local5.0") dynamicUrl = `${localURL}/${param1Value}/${connectURL}/${androidURL}/${param2Value}/${param3Value}${txtURL}`;
        else if (param5Value === "preENV") dynamicUrl = `${preURL}/${param1Value}/${connectURL}/${androidURL}/${param2Value}/${param3Value}${txtURL}`;
      }
    } 
    else if (deviceType === "API") {
      const clientUpper = param1Value.toUpperCase();
      if (isLive) {
        dynamicUrl = `${liveURL}/${apiUrlPath}/${clientUpper}/${param3Value}_${param4Value}${txtURL}`;
      } else if (param5Value === "preENV") {
        dynamicUrl = `${preURL}/${apiUrlPath}/${clientUpper}/${param3Value}_${param4Value}${txtURL}`;
      } else {
        dynamicUrl = `${uatURL}/${apiUrlPath}/${clientUpper}/${param3Value}_${param4Value}${txtURL}`;
      }
    } 
    else if (deviceType === "UPW") {
      const clientUpper = param1Value.toUpperCase();
      if (isLive) {
        dynamicUrl = `${liveURL}/${apiUrlPath}/${upwURL}/${clientUpper}_${param4Value}_CommonLogs${txtURL}`;
      } else if (param5Value === "preENV") {
        dynamicUrl = `${preURL}/${apiUrlPath}/${upwURL}/${clientUpper}_${param4Value}_CommonLogs${txtURL}`;
      } else {
        dynamicUrl = `${uatURL}/${apiUrlPath}/${upwURL}/${clientUpper}_${param4Value}_CommonLogs${txtURL}`;
      }
    } 
    else if (deviceType === "AllLogs") {
      const iOSUrl = isSunEm 
        ? `${sunIntURL}/${param1Value}/${connectURL}/${param2Value}/${param3Value}${txtURL}`
        : `${liveURL}/${param1Value}/${connectURL}/${param2Value}/${param3Value}${txtURL}`;

      const androidUrl = isSunEm 
        ? `${sunIntURL}/${param1Value}/${connectURL}/${androidURL}/${param2Value}/${param3Value}${txtURL}`
        : `${liveURL}/${param1Value}/${connectURL}/${androidURL}/${param2Value}/${param3Value}${txtURL}`;

      const apiUrl = `${liveURL}/${apiUrlPath}/${param1Value.toUpperCase()}/${param3Value}_${param4Value}${txtURL}`;

      window.open(iOSUrl, "_blank");
      window.open(androidUrl, "_blank");
      window.open(apiUrl, "_blank");
      return;
    }

    if (dynamicUrl) {
      if (isSunEm) {
        window.open(dynamicUrl, "_blank");
      } else {
        fetch(dynamicUrl, { method: 'HEAD' })
          .then(response => {
            if (!response.ok) {
              showAlert(`Logs for ${param3Value}_${param1Value}_${param2Value} not found`);
            } else {
              window.open(dynamicUrl, "_blank");
            }
          })
          .catch(() => showAlert("Error checking logs availability"));
      }
    }
    if (dynamicUrl) {
  window.open(dynamicUrl, "_blank");
}
  };

  const objectDownload = () => {
    const clientID = encodeURIComponent(getCurrentClientId());
    const filePath = encodeURIComponent(repCode.toUpperCase());
    const baseURL = "https://cirriusindiacentralstor.blob.core.windows.net/";
    const appendURL = "/ReportObj/Success/";
    const dynamicUrl = `${baseURL}${clientID}${appendURL}${filePath}`;
    window.open(dynamicUrl, "_blank");
  };

  const openImportantLinks = () => {
    window.open("Important Links/importantLinks.html", "_blank");
  };

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setDate(subDays(date, 1));
      } else if (e.key === 'ArrowRight') {
        setDate(addDays(date, 1));
      } else if ((e.key === 'ArrowUp' || e.key === 'ArrowDown') && !isCustomClientMode) {
        const currentIndex = currentClients.findIndex(c => c.value === selectedClient);
        const nextIndex = e.key === 'ArrowUp' 
          ? (currentIndex === 0 ? currentClients.length - 1 : currentIndex - 1)
          : (currentIndex === currentClients.length - 1 ? 0 : currentIndex + 1);
        setSelectedClient(currentClients[nextIndex].value);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [date, selectedClient, isCustomClientMode, currentClients]);

  const handleCustomClientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    setCustomClientId(value);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <Header title="Old Logs" onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 flex flex-col items-center px-4 py-8 md:px-8">
          <h1 className="text-3xl md:text-3xl font-bold text-primary tracking-wide mb-1">
            USER LOGS
          </h1>

          <div className="w-full max-w-3xl bg-card border border-border rounded-xl p-6 md:p-8 space-y-6">
            {/* Client ID Row */}
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-end">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                  Client ID {isCustomClientMode && "(Custom Mode)"}
                </label>
                {isCustomClientMode ? (
                  <Input
                    value={customClientId}
                    onChange={handleCustomClientChange}
                    placeholder="Enter Custom Client ID (e.g. HULCP3)"
                    className="h-11 bg-card border-primary/30 focus:border-primary"
                  />
                ) : (
                  <Select value={selectedClient} onValueChange={setSelectedClient}>
                    <SelectTrigger className="h-11 bg-card border-primary/30 focus:border-primary">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {currentClients.map((client) => (
                        <SelectItem key={client.value} value={client.value}>
                          {client.text}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>

              {!isCustomClientMode && (
                <div className="flex gap-1 pt-6 md:pt-0">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      const idx = currentClients.findIndex(c => c.value === selectedClient);
                      setSelectedClient(currentClients[idx === 0 ? currentClients.length - 1 : idx - 1].value);
                    }}
                  >
                    <ChevronUp className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      const idx = currentClients.findIndex(c => c.value === selectedClient);
                      setSelectedClient(currentClients[idx === currentClients.length - 1 ? 0 : idx + 1].value);
                    }}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>

            {/* Date & Environment Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Date</label>
                <div className="flex gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="flex-1 justify-start text-left font-normal h-11">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {format(date, "dd/MM/yyyy")}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={date} onSelect={(d) => d && setDate(d)} />
                    </PopoverContent>
                  </Popover>

                  <Button variant="outline" size="icon" onClick={() => setDate(subDays(date, 1))}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => setDate(addDays(date, 1))}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Environment</label>
                <Select value={environment} onValueChange={(val: "live" | "local") => setEnvironment(val)}>
                  <SelectTrigger className="h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="live">LIVE</SelectItem>
                    <SelectItem value="local">LOCAL / UAT / PRE</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Rep Code + Local Env Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                  Rep Code / File Path
                </label>
                <Input
                  value={repCode}
                  onChange={(e) => setRepCode(e.target.value.toUpperCase())}
                  placeholder="Enter Rep Code"
                  className="h-11"
                />
              </div>

              {environment === "local" && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                    Local Environment Type
                  </label>
                  <Select value={localEnvType} onValueChange={(val) => setLocalEnvType(val as "storageGP" | "local5.0" | "preENV")}>
                    <SelectTrigger className="h-11">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {localEnvOptions.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.text}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            {/* Action Buttons - Now Complete */}
            <div className="pt-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                <Button onClick={() => logsDownload("iOSCP3")}>
                  iOS CP3 Logs
                </Button>
                <Button onClick={() => logsDownload("iOS")}>
                  iOS Logs
                </Button>
                <Button onClick={() => logsDownload("Android")}>
                  Android Logs
                </Button>
                <Button onClick={() => logsDownload("API")}>
                  API Logs
                </Button>

                <Button onClick={() => logsDownload("UPW")}>
                  UPW Logs
                </Button>
                <Button onClick={() => logsDownload("AllLogs")}>
                  All Logs
                </Button>
                <Button onClick={objectDownload}>
                  Reporting Object
                </Button>
                <Button onClick={openImportantLinks}>
                  Important Links
                </Button>

                <Button 
                  variant={isCustomClientMode ? "default" : "outline"}
                  onClick={() => setIsCustomClientMode(!isCustomClientMode)}
                  className="col-span-2 md:col-span-1"
                >
                  {isCustomClientMode ? "Use Dropdown" : "Custom Client ID"}
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default OldLogs;