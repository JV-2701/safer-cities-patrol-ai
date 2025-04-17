
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, AlertCircle, Loader2 } from "lucide-react";

interface SearchFormProps {
  caseId: string;
  setCaseId: (id: string) => void;
  handleSearch: (e: React.FormEvent | null) => void;
  loading: boolean;
  error: string | null;
}

const SearchForm = ({
  caseId,
  setCaseId,
  handleSearch,
  loading,
  error
}: SearchFormProps) => {
  return (
    <Card className="bg-police-800/40 backdrop-blur-lg border-police-700 mb-8">
      <CardHeader>
        <CardTitle className="text-lg">Enter Case ID</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSearch} className="flex space-x-2">
          <Input
            value={caseId}
            onChange={(e) => setCaseId(e.target.value)}
            placeholder="e.g. SP-2025-04-782"
            className="bg-police-800 border-police-700 text-white"
          />
          <Button type="submit" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <Search className="h-4 w-4 mr-2" />
                Search
              </>
            )}
          </Button>
        </form>
        {error && (
          <div className="mt-4 p-3 bg-alert/20 border border-alert/30 rounded-lg text-sm flex items-center">
            <AlertCircle className="h-4 w-4 text-alert mr-2" />
            {error}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SearchForm;
