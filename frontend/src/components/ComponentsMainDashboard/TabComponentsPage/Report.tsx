import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { Button } from "../../ui/button";
import MyLeafletMap from "../../Map/Map";
import { TabsContent } from "../../ui/tabs";

const Report = () => {
  return (
    <div className="p-14 w-full">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Generate Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-sm font-medium">
                Report Type
              </label>
              <select className="w-full p-2 border rounded">
                <option>Sales Report</option>
                <option>Performance Report</option>
                <option>Client Report</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">
                Date Range
              </label>
              <div className="flex space-x-4">
                <input type="date" className="p-2 border rounded" />
                <input type="date" className="p-2 border rounded" />
              </div>
            </div>
            <Button className="w-full">Generate Report</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Report;
