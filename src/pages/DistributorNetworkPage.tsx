import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Phone, Mail, Globe, Clock, Search, Filter, ExternalLink } from 'lucide-react';
import DistributorMap from '@/components/DistributorMap';

interface Distributor {
  id: string;
  name: string;
  region: string;
  state: string;
  address: string;
  phone: string;
  email: string;
  website?: string;
  services: string[];
  specializations: string[];
  hours: string;
  distance?: number;
  type: string;
  coordinates: [number, number]; // [latitude, longitude]
}

const distributors: Distributor[] = [
  {
    id: '1',
    name: 'NTS - Nutrition Matters Store - Australia',
    region: 'Queensland Sunshine Coast',
    state: 'Queensland',
    address: '7 Harvest Road, Yandina, Queensland, 4561, Australia',
    phone: '+61 7 54729900',
    email: 'sales@nutri-tech.com.au',
    website: 'Nutri-Tech Solutions - Nutrition Matters Store',
    services: ['Retail Store', 'Direct Sales'],
    specializations: [],
    hours: 'Monday – Friday 8:00 am to 3:30 pm',
    type: 'Main Store',
    coordinates: [-26.5667, 152.9667] // Yandina, Queensland coordinates
  },
  {
    id: '2',
    name: 'Agriculture Solutions - Canada',
    region: 'Ontario, Canada',
    state: 'Ontario',
    address: '2079 LINE 34, SHAKESPEARE, ONTARIO, N0B 2P0, CANADA',
    phone: '855-247-6548',
    email: 'info@agriculturesolutions.ca',
    website: 'Agriculture Solutions - Canada',
    services: ['Distribution', 'Consultation'],
    specializations: [],
    hours: 'Monday – Friday 8:00 am to 3:30 pm',
    type: 'International Distributor',
    coordinates: [43.6532, -80.3832] // Shakespeare, Ontario coordinates
  },
  {
    id: '3',
    name: 'NEW GENERATION AGRICULTURE - UK',
    region: 'Belfast, UK',
    state: 'Belfast',
    address: '7 Donegall Square, West, Belfast, BT1 6JH, UK',
    phone: '+44 (0)28 9091 8664',
    email: 'info@newgenagri.com',
    website: 'Online & Direct Sales',
    services: ['Online Sales', 'Direct Sales'],
    specializations: [],
    hours: 'Monday – Friday 8:00 am to 3:30 pm',
    type: 'International Distributor',
    coordinates: [54.5973, -5.9301] // Belfast, UK coordinates
  },
  {
    id: '4',
    name: 'Biologix Ltd',
    region: 'Marlborough, New Zealand',
    state: 'Marlborough',
    address: '201 New Renwick Rd, Blenheim, Marlborough, 7272, New Zealand',
    phone: '021 1901051',
    email: 'Daniel@biologix.co.nz',
    website: 'Online Sales, Direct Sales, Wholesale Sales, Consultation, Soil and Leaf analysis and Education',
    services: ['Online Sales', 'Direct Sales', 'Wholesale', 'Consultation', 'Soil Analysis', 'Education'],
    specializations: [],
    hours: 'Monday – Friday 8:00 am to 3:30 pm',
    type: 'International Distributor',
    coordinates: [-41.5145, 173.9708] // Blenheim, New Zealand coordinates
  },
  {
    id: '5',
    name: 'Maxgro International Pvt Ltd',
    region: 'Negombo, Sri Lanka',
    state: 'Negombo',
    address: 'No: 45/7B, Temple Road, Negombo, Province (Western), District (Gampha), 11500, Sri Lanka',
    phone: '+94 766 072 302',
    email: 'maxgro.int@gmail.com',
    website: 'Online Sales, Direct Sales and Consultation',
    services: ['Online Sales', 'Direct Sales', 'Consultation'],
    specializations: [],
    hours: 'Monday – Friday 8:00 am to 3:30 pm',
    type: 'International Distributor',
    coordinates: [7.2091, 79.8386] // Negombo, Sri Lanka coordinates
  },
  {
    id: '6',
    name: 'Nutri Tech India Private Limited',
    region: 'Mumbai, India',
    state: 'Maharashtra',
    address: 'A-211, Pranik Chambers, Saki Vihar Road, Sakinaka, Mumbai, Maharashtra, 400 072, India',
    phone: '+91 98213 46673',
    email: 'ajay.sharangdhar@gmail.com',
    website: 'Online Sales, Direct Sales and Consultation',
    services: ['Online Sales', 'Direct Sales', 'Consultation'],
    specializations: [],
    hours: 'Monday – Friday 8:00 am to 3:30 pm',
    type: 'International Distributor',
    coordinates: [19.0760, 72.8777] // Mumbai, India coordinates
  },
  {
    id: '7',
    name: 'NuEarth Sdn. Bhd.',
    region: 'Subang Jaya, Malaysia',
    state: 'Selangor Darul Ehsan',
    address: '57-B, Jalan USJ 21/11, UEP Subang Jaya, Selangor Darul Ehsan, 47620, Malaysia',
    phone: '+603-8024 4899',
    email: 'inquiry@nuearth.com.my',
    website: 'Wholesaler & Consultation',
    services: ['Wholesale', 'Consultation'],
    specializations: [],
    hours: 'Monday – Friday 8:00 am to 3:30 pm',
    type: 'International Distributor',
    coordinates: [3.0738, 101.5183] // Subang Jaya, Malaysia coordinates
  }
];

// Helper functions for summary
const countryMap: Record<string, { country: string; continent: string }> = {
  'Australia': { country: 'Australia', continent: 'Oceania' },
  'Canada': { country: 'Canada', continent: 'North America' },
  'UK': { country: 'United Kingdom', continent: 'Europe' },
  'New Zealand': { country: 'New Zealand', continent: 'Oceania' },
  'Sri Lanka': { country: 'Sri Lanka', continent: 'Asia' },
  'India': { country: 'India', continent: 'Asia' },
  'Malaysia': { country: 'Malaysia', continent: 'Asia' },
};

const allContinents = ['Africa', 'Asia', 'Europe', 'North America', 'Oceania', 'South America', 'Antarctica'];
const majorCountries = ['United States', 'Brazil', 'China', 'South Africa', 'France', 'Germany', 'Japan', 'Mexico', 'Russia', 'Egypt'];

function getCountryFromDistributor(distributor) {
  // Try to extract country from address or region
  if (distributor.region.includes('Australia')) return 'Australia';
  if (distributor.region.includes('Canada')) return 'Canada';
  if (distributor.region.includes('UK')) return 'United Kingdom';
  if (distributor.region.includes('New Zealand')) return 'New Zealand';
  if (distributor.region.includes('Sri Lanka')) return 'Sri Lanka';
  if (distributor.region.includes('India')) return 'India';
  if (distributor.region.includes('Malaysia')) return 'Malaysia';
  // fallback: try address
  if (distributor.address.includes('Australia')) return 'Australia';
  if (distributor.address.includes('Canada')) return 'Canada';
  if (distributor.address.includes('UK')) return 'United Kingdom';
  if (distributor.address.includes('New Zealand')) return 'New Zealand';
  if (distributor.address.includes('Sri Lanka')) return 'Sri Lanka';
  if (distributor.address.includes('India')) return 'India';
  if (distributor.address.includes('Malaysia')) return 'Malaysia';
  return 'Unknown';
}

function getContinentFromCountry(country) {
  return countryMap[country]?.continent || 'Unknown';
}

const distributorCountries = Array.from(new Set(distributors.map(getCountryFromDistributor)));
const distributorContinents = Array.from(new Set(distributorCountries.map(getContinentFromCountry)));
const missingContinents = allContinents.filter(cont => !distributorContinents.includes(cont));
const missingMajorCountries = majorCountries.filter(c => !distributorCountries.includes(c));

const DistributorNetworkPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('all');

  const states = ['all', ...Array.from(new Set(distributors.map(d => d.state)))];

  const filteredDistributors = distributors.filter(distributor => {
    const matchesSearch = distributor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         distributor.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         distributor.address.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesState = selectedState === 'all' || distributor.state === selectedState;

    return matchesSearch && matchesState;
  });

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-primary">Distributor Network</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Connect with Nutri-Tech Solutions distributors worldwide. Our global network provides 
          access to high-quality soil nutrition products and expert consultation services.
        </p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Find Your Local Distributor
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Search</label>
              <Input
                placeholder="Search by name, region, or address..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">State</label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full p-2 border border-input rounded-md bg-background"
              >
                {states.map(state => (
                  <option key={state} value={state}>
                    {state === 'all' ? 'All States' : state}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Map Section */}
      <DistributorMap distributors={filteredDistributors} />

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredDistributors.length} of {distributors.length} distributors
        </p>
        <Badge variant="secondary" className="flex items-center gap-1">
          <Filter className="h-3 w-3" />
          Filtered
        </Badge>
      </div>

      {/* Distributors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDistributors.map((distributor) => (
          <Card key={distributor.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{distributor.name}</CardTitle>
                  <p className="text-sm text-gray-500">{distributor.region}, {distributor.state}</p>
                </div>
                <Badge variant={distributor.type === 'Main Store' ? 'default' : 'secondary'}>
                  {distributor.type}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                  <p className="text-sm text-gray-600">{distributor.address}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <a 
                    href={`mailto:${distributor.email}`}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    {distributor.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <a 
                    href={`tel:${distributor.phone}`}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    {distributor.phone}
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredDistributors.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No distributors found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or contact our main office for assistance.
            </p>
            <Button onClick={() => {
              setSearchTerm('');
              setSelectedState('all');
            }}>
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Contact Information */}
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="text-primary">Contact Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Main Office</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Contact our main office for all inquiries about products, services, and support.
              </p>
              <div className="space-y-1 text-sm">
                <p><strong>Phone:</strong> +61 7 5472 9900</p>
                <p><strong>Email:</strong> info@nutri-tech.com.au</p>
                <p><strong>Address:</strong> 7 Harvest Road, Yandina, Queensland 4561</p>
                <p><strong>ABN:</strong> 83 010 472 590</p>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">The Nutrition Matters Shop</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Visit our shop for local gardeners, farmers and health enthusiasts to find tools for soil vitality.
              </p>
              <div className="space-y-1 text-sm">
                <p><strong>Location:</strong> 7 Harvest Road, Yandina, Queensland</p>
                <p><strong>Hours:</strong> Monday – Friday 8:00 am to 3:30 pm</p>
                <p><strong>Services:</strong> Product sales and local support</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Distributor Network Summary */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Distributor Network Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Countries Covered</h4>
              <ul className="list-disc ml-5 text-sm">
                {distributorCountries.map(country => (
                  <li key={country}>{country}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Continents Covered</h4>
              <ul className="list-disc ml-5 text-sm">
                {distributorContinents.map(cont => (
                  <li key={cont}>{cont}</li>
                ))}
              </ul>
              <h4 className="font-semibold mt-4 mb-2">Continents Missing</h4>
              <ul className="list-disc ml-5 text-sm">
                {missingContinents.map(cont => (
                  <li key={cont}>{cont}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Major Countries Missing</h4>
              <ul className="list-disc ml-5 text-sm">
                {missingMajorCountries.map(country => (
                  <li key={country}>{country}</li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DistributorNetworkPage; 