import React, { useState, useEffect, useRef } from 'react';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TfiWorld } from "react-icons/tfi";
import { IoCodeSlashOutline } from "react-icons/io5";
import { cn } from "@/lib/utils";
import { message } from 'antd';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function OldLogs2() {
  const [isLive, setIsLive] = useState(true);
  const [isCustomClient, setIsCustomClient] = useState(false);
  const [customClientValue, setCustomClientValue] = useState('');
  const [selectedClient, setSelectedClient] = useState('');
  const [dateValue, setDateValue] = useState('');
  const [param3, setParam3] = useState('');
  const [localEnv, setLocalEnv] = useState('storageGP');
   const [sidebarOpen, setSidebarOpen] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const clientSelectRef = useRef<HTMLSelectElement>(null);
  const dateInputRef = useRef<HTMLInputElement>(null);

  const LiveArray = [
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
    { value: "medtech", text: "MEDTECH (medtech)" }
  ];

  const LocalArray = [
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
    { value: "danonepre", text: "DANONEPRE (danonepre)" }
  ];

  const LocalLinks = [
    { value: 'preENV', text: 'PRE ENV' },
    { value: 'local5.0', text: 'LOCAL 5.0' },
    { value: 'storageGP', text: 'STORAGE GP / QC ENV' }
  ];

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setDateValue(today);
  }, []);

  useEffect(() => {
    if (!isCustomClient) {
      setSelectedClient(isLive ? LiveArray[0].value : LocalArray[0].value);
    }
  }, [isLive, isCustomClient]);

  const toggleCustomClient = () => {
    setIsCustomClient(prev => !prev);
    if (!isCustomClient) {
      setCustomClientValue('');
    }
  };

  const showAlert = (msg: string) => {
    message.error(msg);
  };

  const formatDateForURL = (dateString: string) => {
    const parts = dateString.split('-');
    if (parts.length === 3) {
      return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    return dateString;
  };

  const formatDateForAPIURL = (dateString: string) => {
    const parts = dateString.split('-');
    if (parts.length === 3) {
      return `${parts[0]}${parts[1]}${parts[2]}`;
    }
    return dateString;
  };

  const logsDownload = (deviceType: string, linkType: string) => {
    const client = isCustomClient ? customClientValue.trim() : selectedClient;

    if (!client) {
      showAlert("Please enter/select a Client ID");
      return;
    }

    const param1Value = encodeURIComponent(client).toLowerCase();
    const param2Value = formatDateForURL(dateValue);
    const param3Encoded = encodeURIComponent(param3.toUpperCase());
    const param4Value = formatDateForAPIURL(dateValue);
    const param5Value = localEnv;

    const liveURL = "https://cirriusindiacentralstor.blob.core.windows.net";
    const uatURL = "https://storagegpworker.blob.core.windows.net";
    const preURL = "https://storageaccountuat2.blob.core.windows.net";
    const localURL = "https://cirrdevstore.blob.core.windows.net";
    const sunIntURL = "https://blobstoragegm.blob.core.windows.net";
    const connectURL = "images/txnsgp/devicelog";
    const apiUrl = "apilogs";
    const upwURL = "UPW";
    const androidURL = "android";
    const txtURL = ".txt";
    const cp3 = "cp3";

    let dynamicUrl = "";

    if (deviceType === "iOSCP3") {
      if (linkType === "Live") {
        dynamicUrl = `${liveURL}/${param1Value}/${cp3}/${connectURL}/${param2Value}/${param3Encoded}${txtURL}`;
      } else {
        if (param5Value === "storageGP") {
          dynamicUrl = `${uatURL}/${param1Value}/${cp3}/${connectURL}/${param2Value}/${param3Encoded}${txtURL}`;
        } else if (param5Value === "local5.0") {
          dynamicUrl = `${localURL}/${param1Value}/${cp3}/${connectURL}/${param2Value}/${param3Encoded}${txtURL}`;
          window.open(dynamicUrl, "_blank");
          return;
        } else if (param5Value === "preENV") {
          dynamicUrl = `${preURL}/${param1Value}/${cp3}/${connectURL}/${param2Value}/${param3Encoded}${txtURL}`;
        }
      }
      console.log(dynamicUrl);
    }
    else if (deviceType === "iOS") {
      if (linkType === "Live") {
        if (param1Value === "sunem1" || param1Value === "sunem3") {
          dynamicUrl = `${sunIntURL}/${param1Value}/${connectURL}/${param2Value}/${param3Encoded}${txtURL}`;
        } else {
          dynamicUrl = `${liveURL}/${param1Value}/${connectURL}/${param2Value}/${param3Encoded}${txtURL}`;
        }
      } else {
        if (param5Value === "storageGP") {
          dynamicUrl = `${uatURL}/${param1Value}/${connectURL}/${param2Value}/${param3Encoded}${txtURL}`;
        } else if (param5Value === "local5.0") {
          dynamicUrl = `${localURL}/${param1Value}/${connectURL}/${param2Value}/${param3Encoded}${txtURL}`;
          window.open(dynamicUrl, "_blank");
          return;
        } else if (param5Value === "preENV") {
          dynamicUrl = `${preURL}/${param1Value}/${connectURL}/${param2Value}/${param3Encoded}${txtURL}`;
        }
      }
    }
    else if (deviceType === "Android") {
      if (linkType === "Live") {
        if (param1Value === "sunem1" || param1Value === "sunem3") {
          dynamicUrl = `${sunIntURL}/${param1Value}/${connectURL}/${androidURL}/${param2Value}/${param3Encoded}${txtURL}`;
        } else {
          dynamicUrl = `${liveURL}/${param1Value}/${connectURL}/${androidURL}/${param2Value}/${param3Encoded}${txtURL}`;
        }
      } else {
        if (param5Value === "storageGP") {
          dynamicUrl = `${uatURL}/${param1Value}/${connectURL}/${androidURL}/${param2Value}/${param3Encoded}${txtURL}`;
        } else if (param5Value === "local5.0") {
          dynamicUrl = `${localURL}/${param1Value}/${connectURL}/${androidURL}/${param2Value}/${param3Encoded}${txtURL}`;
          window.open(dynamicUrl, "_blank");
          return;
        } else if (param5Value === "preENV") {
          dynamicUrl = `${preURL}/${param1Value}/${connectURL}/${androidURL}/${param2Value}/${param3Encoded}${txtURL}`;
        }
      }
    }
    else if (deviceType === "API") {
      if (linkType === "Live") {
        dynamicUrl = `${liveURL}/${apiUrl}/${param1Value.toUpperCase()}/${param3Encoded}_${param4Value}${txtURL}`;
      } else if (param5Value === "preENV") {
        dynamicUrl = `${preURL}/${apiUrl}/${param1Value.toUpperCase()}/${param3Encoded}_${param4Value}${txtURL}`;
      } else {
        dynamicUrl = `${uatURL}/${apiUrl}/${param1Value.toUpperCase()}/${param3Encoded}_${param4Value}${txtURL}`;
      }
    }
    else if (deviceType === "UPW") {
      if (linkType === "Live") {
        dynamicUrl = `${liveURL}/${apiUrl}/${upwURL}/${param1Value.toUpperCase()}_${param4Value}_CommonLogs${txtURL}`;
      } else if (param5Value === "preENV") {
        dynamicUrl = `${preURL}/${apiUrl}/${upwURL}/${param1Value.toUpperCase()}_${param4Value}_CommonLogs${txtURL}`;
      } else {
        dynamicUrl = `${uatURL}/${apiUrl}/${upwURL}/${param1Value.toUpperCase()}_${param4Value}_CommonLogs${txtURL}`;
      }
    }
    else {
      let iOSUrl = '';
      let androidUrl = '';
      let apiUrlLocal = '';

      if (param1Value === "sunem1" || param1Value === "sunem3") {
        iOSUrl = `${sunIntURL}/${param1Value}/${connectURL}/${param2Value}/${param3Encoded}${txtURL}`;
        androidUrl = `${sunIntURL}/${param1Value}/${connectURL}/${androidURL}/${param2Value}/${param3Encoded}${txtURL}`;
        apiUrlLocal = `${liveURL}/${apiUrl}/${param1Value.toUpperCase()}/${param3Encoded}_${param4Value}${txtURL}`;
      } else {
        iOSUrl = `${liveURL}/${param1Value}/${connectURL}/${param2Value}/${param3Encoded}${txtURL}`;
        androidUrl = `${liveURL}/${param1Value}/${connectURL}/${androidURL}/${param2Value}/${param3Encoded}${txtURL}`;
        apiUrlLocal = `${liveURL}/${apiUrl}/${param1Value.toUpperCase()}/${param3Encoded}_${param4Value}${txtURL}`;
      }

      if (param1Value === "sunem1" || param1Value === "sunem3") {
        window.open(iOSUrl, "_blank");
        window.open(androidUrl, "_blank");
        window.open(apiUrlLocal, "_blank");
      } else {
        fetch(iOSUrl).then(response => {
          if (!response.ok) {
            showAlert(`Logs for ${param3Encoded}_${param1Value}_${param2Value} not found`);
          } else {
            window.open(iOSUrl, "_blank");
            window.open(androidUrl, "_blank");
            window.open(apiUrlLocal, "_blank");
          }
        });
      }
      return;
    }

    if (param1Value === "sunem1" || param1Value === "sunem3") {
      window.open(dynamicUrl, "_blank");
      console.log(dynamicUrl);
    } else {
      fetch(dynamicUrl).then(response => {
        if (!response.ok) {
          showAlert(`Logs for ${param3Encoded}_${param1Value}_${param2Value} not found`);
          console.log(dynamicUrl);
        } else {
          window.open(dynamicUrl, "_blank");
          console.log(dynamicUrl);
        }
      });
    }
  };

  const objectDownload = () => {
    const clientID = encodeURIComponent(isCustomClient ? customClientValue : selectedClient);
    const filePath = encodeURIComponent(param3.toUpperCase());
    const baseURL = "https://cirriusindiacentralstor.blob.core.windows.net/";
    const appendURL = "/ReportObj/Success/";
    const dynamicUrl = `${baseURL}${clientID}${appendURL}${filePath}`;
    window.open(dynamicUrl, "_blank");
  };

  const handleDateBack = () => {
    const newDate = new Date(dateValue);
    newDate.setDate(newDate.getDate() - 1);
    setDateValue(newDate.toISOString().split('T')[0]);
  };

  const handleDateForward = () => {
    const newDate = new Date(dateValue);
    newDate.setDate(newDate.getDate() + 1);
    setDateValue(newDate.toISOString().split('T')[0]);
  };

  const handleClientDown = () => {
    if (clientSelectRef.current) {
      const select = clientSelectRef.current;
      if (select.selectedIndex === 0) {
        select.selectedIndex = select.options.length - 1;
      } else {
        select.selectedIndex = select.selectedIndex - 1;
      }
      setSelectedClient(select.value);
    }
  };

  const handleClientUp = () => {
    if (clientSelectRef.current) {
      const select = clientSelectRef.current;
      if (select.selectedIndex === select.options.length - 1) {
        select.selectedIndex = 0;
      } else {
        select.selectedIndex = select.selectedIndex + 1;
      }
      setSelectedClient(select.value);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') handleDateBack();
      else if (event.key === 'ArrowRight') handleDateForward();
      else if (event.key === 'ArrowDown') handleClientDown();
      else if (event.key === 'ArrowUp') handleClientUp();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [dateValue]);

  return (
    <div className="flex min-h-screen bg-background relative">
     <AppSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <Header title="Old Logs" onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 flex flex-col justify-center items-center px-4 py-6 md:px-10">
          {/* <h1 className="text-3xl md:text-3xl font-bold text-primary tracking-wide bg-gradient-to-r mb-3">
            LOGS DOWNLOADER
          </h1> */}

       <div className="w-full max-w-[95%] xl:max-w-[1400px] 2xl:max-w-[1600px] bg-card border border-border shadow-md rounded-xl p-6 md:p-10 space-y-5">

            {/* Row 1: Client ID + nav arrows + Date + date nav */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr_auto] gap-4 items-end">

              {/* Client ID */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground flex uppercase tracking-wide">
                  Client ID {isCustomClient && "(Custom)"}
                </label>
                {isCustomClient ? (
                  <Input
                    value={customClientValue}
                    onChange={(e) =>
                      setCustomClientValue(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ""))
                    }
                    placeholder="CUSTOM CLIENT ID"
                    className="h-11 bg-card border-primary/30 focus:border-primary placeholder:text-primary/50"
                  />
                ) : (
                  <Select
                    value={selectedClient}
                    onValueChange={(val) => setSelectedClient(val)}
                  >
                    <SelectTrigger className="w-full h-11 bg-card border-primary/30 focus:border-primary">
                      <SelectValue placeholder="Select Client" />
                    </SelectTrigger>
                    <SelectContent className="max-h-80 bg-popover border-border">
                      {(isLive ? LiveArray : LocalArray).map((item, i) => (
                        <SelectItem key={i} value={item.value}>
                          {item.text}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>

              {/* Client nav arrows */}
              {!isCustomClient && (
                <div className="flex gap-1">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleClientDown}
                    className="h-11 w-11 border-primary/30"
                    title="Previous Client"
                  >
                    <ChevronUp className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleClientUp}
                    className="h-11 w-11 border-primary/30"
                    title="Next Client"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>
              )}

              {/* Date */}
              <div className="space-y-2">
                <label className="text-sm font-medium flex text-muted-foreground uppercase tracking-wide">
                  Date
                </label>
                <input
                  ref={dateInputRef}
                  type="date"
                  value={dateValue}
                  onChange={(e) => setDateValue(e.target.value)}
                  className="h-11 w-full bg-card border border-primary/30 rounded-lg px-3 text-sm text-foreground focus:outline-none focus:border-primary"
                />
              </div>

              {/* Date nav arrows */}
              <div className="flex gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleDateBack}
                  className="h-11 w-11 border-primary/30"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleDateForward}
                  className="h-11 w-11 border-primary/30"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Row 2: Filename + Environment + Custom toggle */}
            <div className="grid grid-cols-1 lg:grid-cols-[2fr_2fr_auto] gap-4 items-end">    

              {/* Filename */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                  Filename / Report Object
                </label>
                <Input
                  value={param3}
                  onChange={(e) => setParam3(e.target.value.toUpperCase())}
                  placeholder="Enter filename or object name"
                  className="h-11 bg-card border-primary/30 focus:border-primary placeholder:text-primary/50"
                />
              </div>

              {/* Environment */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground flex uppercase tracking-wide">
                  {isLive
                    ? <><TfiWorld className="me-1" /> Environment</>
                    : <><IoCodeSlashOutline className="me-1" /> Local Env</>
                  }
                </label>
                {isLive ? (
                  <div className="h-11 flex items-center px-3 rounded-lg border border-primary/30 bg-card text-sm text-primary font-semibold">
                    LIVE
                  </div>
                ) : (
                  <Select
                    value={localEnv}
                    onValueChange={(val) => setLocalEnv(val)}
                  >
                    <SelectTrigger className="w-full h-11 bg-card border-primary/30 focus:border-primary">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      {LocalLinks.map((item, i) => (
                        <SelectItem key={i} value={item.value}>
                          {item.text}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>

              {/* Custom Client toggle */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                  &nbsp;
                </label>
                <Button
                  variant={isCustomClient ? "default" : "outline"}
                  onClick={toggleCustomClient}
                  className="h-11 border-primary/30"
                >
                  {isCustomClient ? "Use Dropdown" : "Custom Client"}
                </Button>
              </div>
            </div>

            {/* UAT Mode checkbox */}
            <div className="pt-1">
              <label className="flex items-center gap-3 cursor-pointer text-sm font-medium text-muted-foreground uppercase tracking-wide">
                <input
                  type="checkbox"
                  checked={!isLive}
                  onChange={() => setIsLive(!isLive)}
                  className="accent-primary w-4 h-4 cursor-pointer"
                />
                <span>Local / UAT Mode</span>
              </label>
            </div>

            {/* Action Buttons */}
            <div className="pt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

  <Button
    onClick={() => logsDownload("iOSCP3", isLive ? "Live" : "Local")}
    className="relative overflow-hidden h-12 w-full font-medium text-sm bg-primary hover:bg-primary/90 text-primary-foreground transform transition duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-lg
    before:absolute before:top-0 before:left-[-100%] before:h-full before:w-1/2 before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent before:skew-x-12 before:transition-all before:duration-500 hover:before:left-[120%]"
  >
    iOS CP3 {isLive ? "Live" : "Local"}
  </Button>

  <Button
    onClick={() => logsDownload("iOS", isLive ? "Live" : "Local")}
    className="relative overflow-hidden h-12 w-full font-medium text-sm bg-primary hover:bg-primary/90 text-primary-foreground transform transition duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-lg
    before:absolute before:top-0 before:left-[-100%] before:h-full before:w-1/2 before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent before:skew-x-12 before:transition-all before:duration-500 hover:before:left-[120%]"
  >
    iOS Logs
  </Button>

  <Button
    onClick={() => logsDownload("Android", isLive ? "Live" : "Local")}
    className="relative overflow-hidden h-12 w-full font-medium text-sm bg-primary hover:bg-primary/90 text-primary-foreground transform transition duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-lg
    before:absolute before:top-0 before:left-[-100%] before:h-full before:w-1/2 before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent before:skew-x-12 before:transition-all before:duration-500 hover:before:left-[120%]"
  >
    Android Logs
  </Button>

  <Button
    onClick={() => logsDownload("API", isLive ? "Live" : "Local")}
    className="relative overflow-hidden h-12 w-full font-medium text-sm bg-primary hover:bg-primary/90 text-primary-foreground transform transition duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-lg
    before:absolute before:top-0 before:left-[-100%] before:h-full before:w-1/2 before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent before:skew-x-12 before:transition-all before:duration-500 hover:before:left-[120%]"
  >
    API Logs
  </Button>

  <Button
    onClick={() => logsDownload("UPW", isLive ? "Live" : "Local")}
    className="relative overflow-hidden h-12 w-full font-medium text-sm bg-primary hover:bg-primary/90 text-primary-foreground transform transition duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-lg
    before:absolute before:top-0 before:left-[-100%] before:h-full before:w-1/2 before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent before:skew-x-12 before:transition-all before:duration-500 hover:before:left-[120%]"
  >
    UPW Logs
  </Button>

  <Button
    onClick={() => logsDownload("AllLogs", "Live")}
    className="relative overflow-hidden h-12 w-full font-medium text-sm transform transition duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-lg
    before:absolute before:top-0 before:left-[-100%] before:h-full before:w-1/2 before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent before:skew-x-12 before:transition-all before:duration-500 hover:before:left-[120%]"
    style={{ backgroundColor: "#38a169", color: "#0f1a1a" }}
  >
    All Logs (Live)
  </Button>

  <Button
    onClick={objectDownload}
    className="relative overflow-hidden h-12 w-full font-medium text-sm bg-primary hover:bg-primary/90 text-primary-foreground transform transition duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-lg
    before:absolute before:top-0 before:left-[-100%] before:h-full before:w-1/2 before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent before:skew-x-12 before:transition-all before:duration-500 hover:before:left-[120%]"
  >
    Download Reporting Object
  </Button>

</div>
            </div>
          </div>

          {/* Footer */}
          <p className="mt-8 text-xs text-muted-foreground opacity-40">
            Aniket — Logs Tool v2.0 (React)
          </p>
        </main>
      </div>
    </div>
  );
}

export default OldLogs2;