"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

interface Props {
  message?: string;
  onRetry?: () => void;
}

const ErrorCard: React.FC<Props> = ({ message = "Something went wrong", onRetry }) => {
  return (
    <Card className="my-4 bg-red-50 border-red-100">
      <CardContent className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <AlertCircle className="text-red-600" />
          <div className="text-sm text-red-700">{message}</div>
        </div>
        {onRetry && (
          <Button variant="destructive" size="sm" onClick={onRetry}>
            Retry
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ErrorCard;
