import React, { useState, useEffect } from 'react';
import NutritionFarmsRequestPage from './NutritionFarmsRequestPage';
import FarmDeliveryPage from './FarmDeliveryPage';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

function getTabFromQuery() {
  if (typeof window === 'undefined') return 'material';
  const params = new URLSearchParams(window.location.search);
  const tab = params.get('tab');
  return tab === 'delivery' ? 'delivery' : 'material';
}

const NutritionFarmsPage = () => {
  const [tab, setTab] = useState(getTabFromQuery());

  useEffect(() => {
    const onPopState = () => {
      setTab(getTabFromQuery());
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Update URL when tab changes
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (tab === 'delivery') {
      params.set('tab', 'delivery');
    } else {
      params.delete('tab');
    }
    const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
    window.history.replaceState({}, '', newUrl);
  }, [tab]);

  return (
    <div className="max-w-7xl mx-auto py-8 space-y-8">
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">Nutrition Farms</h1>
        <p className="text-muted-foreground">Manage all requests and deliveries for Nutrition Farms.</p>
      </div>
      <Tabs value={tab} onValueChange={setTab} className="space-y-6">
        <TabsList className="mb-4">
          <TabsTrigger value="material">Material Request</TabsTrigger>
          <TabsTrigger value="delivery">Farm Delivery</TabsTrigger>
        </TabsList>
        <TabsContent value="material">
          <NutritionFarmsRequestPage />
        </TabsContent>
        <TabsContent value="delivery">
          <FarmDeliveryPage />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NutritionFarmsPage; 