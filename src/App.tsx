import React, { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Header } from './components/layout/Header';
import { Dashboard } from './pages/Dashboard';
import { PropertiesView } from './pages/PropertiesView';
import { MapViewPage } from './pages/MapView';
import { UniversitiesView } from './pages/UniversitiesView';
import { PropertyDetails } from './pages/PropertyDetails';
import { subjectProperties, competitorProperties } from './data/mockData';
import { SubjectProperty, CompetitorProperty } from './types';

function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);

  const handleViewPropertyDetails = (id: string) => {
    setSelectedPropertyId(id);
  };

  const handleBackToProperties = () => {
    setSelectedPropertyId(null);
  };

  const getPropertyById = (id: string) => {
    return (
      subjectProperties.find((p) => p.id === id) ||
      (competitorProperties.find((p) => p.id === id) as SubjectProperty)
    );
  };

  const getHeaderTitle = () => {
    if (selectedPropertyId) {
      return 'Property Details';
    }

    switch (activeView) {
      case 'dashboard':
        return 'Dashboard';
      case 'properties':
        return 'Properties';
      case 'map':
        return 'Map View';
      case 'universities':
        return 'Universities';
      default:
        return 'Dashboard';
    }
  };

  const getHeaderSubtitle = () => {
    if (selectedPropertyId) {
      return 'View detailed information about this property';
    }

    switch (activeView) {
      case 'dashboard':
        return 'Overview of your student housing portfolio';
      case 'properties':
        return 'Manage and analyze your student housing properties';
      case 'map':
        return 'Visualize properties and universities on the map';
      case 'universities':
        return 'Explore universities and student enrollment data';
      default:
        return '';
    }
  };

  const renderContent = () => {
    if (selectedPropertyId) {
      const property = getPropertyById(selectedPropertyId);
      if (!property) return null;
      return <PropertyDetails property={property} onBack={handleBackToProperties} />;
    }

    switch (activeView) {
      case 'dashboard':
        return <Dashboard onViewPropertyDetails={handleViewPropertyDetails} />;
      case 'properties':
        return <PropertiesView onViewPropertyDetails={handleViewPropertyDetails} />;
      case 'map':
        return <MapViewPage onViewPropertyDetails={handleViewPropertyDetails} />;
      case 'universities':
        return <UniversitiesView />;
      default:
        return <Dashboard onViewPropertyDetails={handleViewPropertyDetails} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onNavItemClick={setActiveView} activeView={activeView} />
      <Header title={getHeaderTitle()} subtitle={getHeaderSubtitle()} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;