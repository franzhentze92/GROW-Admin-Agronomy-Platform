import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const BIOLOGY_SIMS = [
  {
    key: 'natural-selection',
    label: 'Natural Selection',
    title: 'Natural Selection',
    iframe: 'https://phet.colorado.edu/sims/html/natural-selection/latest/natural-selection_en.html',
  },
  {
    key: 'gene-expression-essentials',
    label: 'Gene Expression Essentials',
    title: 'Gene Expression Essentials',
    iframe: 'https://phet.colorado.edu/sims/html/gene-expression-essentials/latest/gene-expression-essentials_en.html',
  },
  {
    key: 'concentration',
    label: 'Concentration',
    title: 'Concentration',
    iframe: 'https://phet.colorado.edu/sims/html/concentration/latest/concentration_en.html',
  },
  {
    key: 'diffusion',
    label: 'Diffusion',
    title: 'Diffusion',
    iframe: 'https://phet.colorado.edu/sims/html/diffusion/latest/diffusion_en.html',
  },
  {
    key: 'neuron',
    label: 'Neuron',
    title: 'Neuron',
    iframe: 'https://phet.colorado.edu/sims/html/neuron/latest/neuron_en.html',
  },
  {
    key: 'density',
    label: 'Density',
    title: 'Density',
    iframe: 'https://phet.colorado.edu/sims/html/density/latest/density_en.html',
  },
  {
    key: 'molecule-polarity',
    label: 'Molecule Polarity',
    title: 'Molecule Polarity',
    iframe: 'https://phet.colorado.edu/sims/html/molecule-polarity/latest/molecule-polarity_en.html',
  },
];

const CHEMISTRY_SIMS = [
  {
    key: 'acid-base-solutions',
    label: 'Acid-Base Solutions',
    title: 'Acid-Base Solutions',
    iframe: 'https://phet.colorado.edu/sims/html/acid-base-solutions/latest/acid-base-solutions_en.html',
  },
  {
    key: 'atomic-interactions',
    label: 'Atomic Interactions',
    title: 'Atomic Interactions',
    iframe: 'https://phet.colorado.edu/sims/html/atomic-interactions/latest/atomic-interactions_en.html',
  },
  {
    key: 'balancing-chemical-equations',
    label: 'Balancing Chemical Equations',
    title: 'Balancing Chemical Equations',
    iframe: 'https://phet.colorado.edu/sims/html/balancing-chemical-equations/latest/balancing-chemical-equations_en.html',
  },
  {
    key: 'beers-law-lab',
    label: "Beer's Law Lab",
    title: "Beer's Law Lab",
    iframe: 'https://phet.colorado.edu/sims/html/beers-law-lab/latest/beers-law-lab_en.html',
  },
  {
    key: 'build-a-molecule',
    label: 'Build a Molecule',
    title: 'Build a Molecule',
    iframe: 'https://phet.colorado.edu/sims/html/build-a-molecule/latest/build-a-molecule_en.html',
  },
  {
    key: 'build-an-atom',
    label: 'Build an Atom',
    title: 'Build an Atom',
    iframe: 'https://phet.colorado.edu/sims/html/build-an-atom/latest/build-an-atom_en.html',
  },
  {
    key: 'concentration',
    label: 'Concentration',
    title: 'Concentration',
    iframe: 'https://phet.colorado.edu/sims/html/concentration/latest/concentration_en.html',
  },
  {
    key: 'density',
    label: 'Density',
    title: 'Density',
    iframe: 'https://phet.colorado.edu/sims/html/density/latest/density_en.html',
  },
  {
    key: 'gas-properties',
    label: 'Gas Properties',
    title: 'Gas Properties',
    iframe: 'https://phet.colorado.edu/sims/html/gas-properties/latest/gas-properties_en.html',
  },
  {
    key: 'molecule-polarity',
    label: 'Molecule Polarity',
    title: 'Molecule Polarity',
    iframe: 'https://phet.colorado.edu/sims/html/molecule-polarity/latest/molecule-polarity_en.html',
  },
  {
    key: 'ph-scale',
    label: 'pH Scale',
    title: 'pH Scale',
    iframe: 'https://phet.colorado.edu/sims/html/ph-scale/latest/ph-scale_en.html',
  },
  {
    key: 'reactants-products-and-leftovers',
    label: 'Reactants, Products and Leftovers',
    title: 'Reactants, Products and Leftovers',
    iframe: 'https://phet.colorado.edu/sims/html/reactants-products-and-leftovers/latest/reactants-products-and-leftovers_en.html',
  },
  {
    key: 'states-of-matter-basics',
    label: 'States of Matter: Basics',
    title: 'States of Matter: Basics',
    iframe: 'https://phet.colorado.edu/sims/html/states-of-matter-basics/latest/states-of-matter-basics_en.html',
  },
  {
    key: 'glucose-dilution-chemcollective',
    label: 'Glucose Dilution Problem (ChemCollective)',
    title: 'Glucose Dilution Problem (ChemCollective)',
    iframe: 'https://chemcollective.org/activities/vlab/2',
  },
  {
    key: 'labxchange-simulation',
    label: 'LabXchange Simulation',
    title: 'LabXchange Simulation',
    iframe: 'https://www.labxchange.org/library/items/lb:LabXchange:b4d9f467:lx_simulation:1?fullscreen=true',
  },
];

const EARTH_SPACE_SIMS = [
  { key: "gravity-and-orbits", label: "Gravity and Orbits", title: "Gravity and Orbits", iframe: "https://phet.colorado.edu/sims/html/gravity-and-orbits/latest/gravity-and-orbits_en.html" },
  { key: "lunar-lander", label: "Lunar Lander", title: "Lunar Lander", iframe: "https://phet.colorado.edu/sims/html/lunar-lander/latest/lunar-lander_en.html" },
  { key: "plate-tectonics", label: "Plate Tectonics", title: "Plate Tectonics", iframe: "https://phet.colorado.edu/sims/html/plate-tectonics/latest/plate-tectonics_en.html" },
  { key: "solar-system", label: "Solar System", title: "Solar System", iframe: "https://phet.colorado.edu/sims/html/solar-system/latest/solar-system_en.html" },
  { key: "greenhouse-effect", label: "Greenhouse Effect", title: "Greenhouse Effect", iframe: "https://phet.colorado.edu/sims/html/greenhouse-effect/latest/greenhouse-effect_en.html" },
  { key: "radio-waves", label: "Radio Waves & Electromagnetic Fields", title: "Radio Waves & Electromagnetic Fields", iframe: "https://phet.colorado.edu/sims/html/radio-waves/latest/radio-waves_en.html" },
  { key: "gravity-force-lab", label: "Gravity Force Lab", title: "Gravity Force Lab", iframe: "https://phet.colorado.edu/sims/html/gravity-force-lab/latest/gravity-force-lab_en.html" },
  { key: "gravity-force-lab-basics", label: "Gravity Force Lab: Basics", title: "Gravity Force Lab: Basics", iframe: "https://phet.colorado.edu/sims/html/gravity-force-lab-basics/latest/gravity-force-lab-basics_en.html" },
  { key: "my-solar-system", label: "My Solar System", title: "My Solar System", iframe: "https://phet.colorado.edu/sims/html/my-solar-system/latest/my-solar-system_en.html" },
  { key: "john-travoltage", label: "John Travoltage", title: "John Travoltage", iframe: "https://phet.colorado.edu/sims/html/john-travoltage/latest/john-travoltage_en.html" },
  { key: "balloons-and-static-electricity", label: "Balloons and Static Electricity", title: "Balloons and Static Electricity", iframe: "https://phet.colorado.edu/sims/html/balloons-and-static-electricity/latest/balloons-and-static-electricity_en.html" },
  { key: "balloons-and-buoyancy", label: "Balloons and Buoyancy", title: "Balloons and Buoyancy", iframe: "https://phet.colorado.edu/sims/html/balloons-and-buoyancy/latest/balloons-and-buoyancy_en.html" },
  { key: "buoyancy", label: "Buoyancy", title: "Buoyancy", iframe: "https://phet.colorado.edu/sims/html/buoyancy/latest/buoyancy_en.html" },
  { key: "faradays-law", label: "Faraday's Law", title: "Faraday's Law", iframe: "https://phet.colorado.edu/sims/html/faradays-law/latest/faradays-law_en.html" },
  { key: "faradays-electromagnetic-lab", label: "Faraday's Electromagnetic Lab", title: "Faraday's Electromagnetic Lab", iframe: "https://phet.colorado.edu/sims/html/faradays-electromagnetic-lab/latest/faradays-electromagnetic-lab_en.html" },
  { key: "charges-and-fields", label: "Charges and Fields", title: "Charges and Fields", iframe: "https://phet.colorado.edu/sims/html/charges-and-fields/latest/charges-and-fields_en.html" },
  { key: "electric-field-hockey", label: "Electric Field Hockey", title: "Electric Field Hockey", iframe: "https://phet.colorado.edu/sims/html/electric-field-hockey/latest/electric-field-hockey_en.html" },
  { key: "circuit-construction-kit-dc", label: "Circuit Construction Kit: DC", title: "Circuit Construction Kit: DC", iframe: "https://phet.colorado.edu/sims/html/circuit-construction-kit-dc/latest/circuit-construction-kit-dc_en.html" },
  { key: "electric-circuits", label: "Electric Circuits", title: "Electric Circuits", iframe: "https://phet.colorado.edu/sims/html/electric-circuits/latest/electric-circuits_en.html" },
];

const PHYSICS_SIMS = [
  { key: 'balloons-and-static-electricity', label: 'Balloons and Static Electricity', title: 'Balloons and Static Electricity', iframe: 'https://phet.colorado.edu/sims/html/balloons-and-static-electricity/latest/balloons-and-static-electricity_en.html' },
  { key: 'buoyancy', label: 'Buoyancy', title: 'Buoyancy', iframe: 'https://phet.colorado.edu/sims/html/buoyancy/latest/buoyancy_en.html' },
  { key: 'charges-and-fields', label: 'Charges and Fields', title: 'Charges and Fields', iframe: 'https://phet.colorado.edu/sims/html/charges-and-fields/latest/charges-and-fields_en.html' },
  { key: 'circuit-construction-kit-dc', label: 'Circuit Construction Kit: DC', title: 'Circuit Construction Kit: DC', iframe: 'https://phet.colorado.edu/sims/html/circuit-construction-kit-dc/latest/circuit-construction-kit-dc_en.html' },
  { key: 'circuit-construction-kit-dc-virtual-lab', label: 'Circuit Construction Kit: DC - Virtual Lab', title: 'Circuit Construction Kit: DC - Virtual Lab', iframe: 'https://phet.colorado.edu/sims/html/circuit-construction-kit-dc-virtual-lab/latest/circuit-construction-kit-dc-virtual-lab_en.html' },
  { key: 'color-vision', label: 'Color Vision', title: 'Color Vision', iframe: 'https://phet.colorado.edu/sims/html/color-vision/latest/color-vision_en.html' },
  { key: 'energy-forms-and-changes', label: 'Energy Forms and Changes', title: 'Energy Forms and Changes', iframe: 'https://phet.colorado.edu/sims/html/energy-forms-and-changes/latest/energy-forms-and-changes_en.html' },
  { key: 'faradays-electromagnetic-lab', label: "Faraday's Electromagnetic Lab", title: "Faraday's Electromagnetic Lab", iframe: 'https://phet.colorado.edu/sims/html/faradays-electromagnetic-lab/latest/faradays-electromagnetic-lab_en.html' },
  { key: 'faradays-law', label: "Faraday's Law", title: "Faraday's Law", iframe: 'https://phet.colorado.edu/sims/html/faradays-law/latest/faradays-law_en.html' },
  { key: 'forces-and-motion-basics', label: 'Forces and Motion: Basics', title: 'Forces and Motion: Basics', iframe: 'https://phet.colorado.edu/sims/html/forces-and-motion-basics/latest/forces-and-motion-basics_en.html' },
  { key: 'friction', label: 'Friction', title: 'Friction', iframe: 'https://phet.colorado.edu/sims/html/friction/latest/friction_en.html' },
  { key: 'gravity-and-orbits', label: 'Gravity and Orbits', title: 'Gravity and Orbits', iframe: 'https://phet.colorado.edu/sims/html/gravity-and-orbits/latest/gravity-and-orbits_en.html' },
  { key: 'gravity-force-lab', label: 'Gravity Force Lab', title: 'Gravity Force Lab', iframe: 'https://phet.colorado.edu/sims/html/gravity-force-lab/latest/gravity-force-lab_en.html' },
  { key: 'gravity-force-lab-basics', label: 'Gravity Force Lab: Basics', title: 'Gravity Force Lab: Basics', iframe: 'https://phet.colorado.edu/sims/html/gravity-force-lab-basics/latest/gravity-force-lab-basics_en.html' },
  { key: 'john-travoltage', label: 'John Travoltage', title: 'John Travoltage', iframe: 'https://phet.colorado.edu/sims/html/john-travoltage/latest/john-travoltage_en.html' },
  { key: 'masses-and-springs', label: 'Masses and Springs', title: 'Masses and Springs', iframe: 'https://phet.colorado.edu/sims/html/masses-and-springs/latest/masses-and-springs_en.html' },
  { key: 'masses-and-springs-basics', label: 'Masses and Springs: Basics', title: 'Masses and Springs: Basics', iframe: 'https://phet.colorado.edu/sims/html/masses-and-springs-basics/latest/masses-and-springs-basics_en.html' },
  { key: 'pendulum-lab', label: 'Pendulum Lab', title: 'Pendulum Lab', iframe: 'https://phet.colorado.edu/sims/html/pendulum-lab/latest/pendulum-lab_en.html' },
  { key: 'projectile-motion', label: 'Projectile Motion', title: 'Projectile Motion', iframe: 'https://phet.colorado.edu/sims/html/projectile-motion/latest/projectile-motion_en.html' },
  { key: 'resistance-in-a-wire', label: 'Resistance in a Wire', title: 'Resistance in a Wire', iframe: 'https://phet.colorado.edu/sims/html/resistance-in-a-wire/latest/resistance-in-a-wire_en.html' },
  { key: 'rutherford-scattering', label: 'Rutherford Scattering', title: 'Rutherford Scattering', iframe: 'https://phet.colorado.edu/sims/html/rutherford-scattering/latest/rutherford-scattering_en.html' },
  { key: 'wave-interference', label: 'Wave Interference', title: 'Wave Interference', iframe: 'https://phet.colorado.edu/sims/html/wave-interference/latest/wave-interference_en.html' },
  { key: 'wave-on-a-string', label: 'Wave on a String', title: 'Wave on a String', iframe: 'https://phet.colorado.edu/sims/html/wave-on-a-string/latest/wave-on-a-string_en.html' },
  { key: 'waves-intro', label: 'Waves Intro', title: 'Waves Intro', iframe: 'https://phet.colorado.edu/sims/html/waves-intro/latest/waves-intro_en.html' },
  { key: 'atomic-interactions', label: 'Atomic Interactions', title: 'Atomic Interactions', iframe: 'https://phet.colorado.edu/sims/html/atomic-interactions/latest/atomic-interactions_en.html' },
  { key: 'blackbody-spectrum', label: 'Blackbody Spectrum', title: 'Blackbody Spectrum', iframe: 'https://phet.colorado.edu/sims/html/blackbody-spectrum/latest/blackbody-spectrum_en.html' },
  { key: 'coulombs-law', label: "Coulomb's Law", title: "Coulomb's Law", iframe: 'https://phet.colorado.edu/sims/html/coulombs-law/latest/coulombs-law_en.html' },
  { key: 'curve-fitting', label: 'Curve Fitting', title: 'Curve Fitting', iframe: 'https://phet.colorado.edu/sims/html/curve-fitting/latest/curve-fitting_en.html' },
  { key: 'energy-skate-park', label: 'Energy Skate Park', title: 'Energy Skate Park', iframe: 'https://phet.colorado.edu/sims/html/energy-skate-park/latest/energy-skate-park_en.html' },
  { key: 'energy-skate-park-basics', label: 'Energy Skate Park: Basics', title: 'Energy Skate Park: Basics', iframe: 'https://phet.colorado.edu/sims/html/energy-skate-park-basics/latest/energy-skate-park-basics_en.html' },
  { key: 'fourier-making-waves', label: 'Fourier: Making Waves', title: 'Fourier: Making Waves', iframe: 'https://phet.colorado.edu/sims/html/fourier-making-waves/latest/fourier-making-waves_en.html' },
  { key: 'geometric-optics', label: 'Geometric Optics', title: 'Geometric Optics', iframe: 'https://phet.colorado.edu/sims/html/geometric-optics/latest/geometric-optics_en.html' },
  { key: 'hookes-law', label: "Hooke's Law", title: "Hooke's Law", iframe: 'https://phet.colorado.edu/sims/html/hookes-law/latest/hookes-law_en.html' },
  { key: 'magnet-and-compass', label: 'Magnet and Compass', title: 'Magnet and Compass', iframe: 'https://phet.colorado.edu/sims/html/magnet-and-compass/latest/magnet-and-compass_en.html' },
  { key: 'magnets-and-electromagnets', label: 'Magnets and Electromagnets', title: 'Magnets and Electromagnets', iframe: 'https://phet.colorado.edu/sims/html/magnets-and-electromagnets/latest/magnets-and-electromagnets_en.html' },
  { key: 'models-of-the-hydrogen-atom', label: 'Models of the Hydrogen Atom', title: 'Models of the Hydrogen Atom', iframe: 'https://phet.colorado.edu/sims/html/models-of-the-hydrogen-atom/latest/models-of-the-hydrogen-atom_en.html' },
  { key: 'molecule-polarity', label: 'Molecule Polarity', title: 'Molecule Polarity', iframe: 'https://phet.colorado.edu/sims/html/molecule-polarity/latest/molecule-polarity_en.html' },
  { key: 'molecule-shapes', label: 'Molecule Shapes', title: 'Molecule Shapes', iframe: 'https://phet.colorado.edu/sims/html/molecule-shapes/latest/molecule-shapes_en.html' },
  { key: 'molecule-shapes-basics', label: 'Molecule Shapes: Basics', title: 'Molecule Shapes: Basics', iframe: 'https://phet.colorado.edu/sims/html/molecule-shapes-basics/latest/molecule-shapes-basics_en.html' },
  { key: 'my-solar-system', label: 'My Solar System', title: 'My Solar System', iframe: 'https://phet.colorado.edu/sims/html/my-solar-system/latest/my-solar-system_en.html' },
  { key: 'ohms-law', label: "Ohm's Law", title: "Ohm's Law", iframe: 'https://phet.colorado.edu/sims/html/ohms-law/latest/ohms-law_en.html' },
];

const SimulationsPage: React.FC = () => {
  const [selectedBiologySim, setSelectedBiologySim] = useState(BIOLOGY_SIMS[0].key);
  const [selectedChemistrySim, setSelectedChemistrySim] = useState(CHEMISTRY_SIMS[0].key);
  const [selectedEarthSpaceSim, setSelectedEarthSpaceSim] = useState(EARTH_SPACE_SIMS[0].key);
  const [selectedPhysicsSim, setSelectedPhysicsSim] = useState(PHYSICS_SIMS[0].key);

  const getCurrentSim = (sims: any[], selectedKey: string) => {
    return sims.find(sim => sim.key === selectedKey) || sims[0];
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Page Title and Subtitle */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Interactive Science Simulations</h1>
        <p className="text-muted-foreground mt-1">
          Master the foundational sciences that drive modern agriculture and farming. Explore interactive biology, chemistry, earth & space, and physics simulations from PhET to understand the scientific principles behind soil health, plant growth, nutrient cycles, weather patterns, and sustainable farming practices.
        </p>
      </div>
      {/* Top-level Subject Tabs */}
      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="chemistry">Chemistry</TabsTrigger>
          <TabsTrigger value="biology">Biology</TabsTrigger>
          <TabsTrigger value="physics">Physics</TabsTrigger>
          <TabsTrigger value="earth-space">Earth & Space</TabsTrigger>
        </TabsList>
        {/* Dashboard Tab */}
        <TabsContent value="dashboard" className="w-full">
          <div className="flex flex-col items-center justify-center py-12">
            <h2 className="text-2xl font-semibold mb-4">How to Use This Tool</h2>
            <ul className="list-disc text-lg text-gray-700 mb-4 pl-6 text-left max-w-2xl">
              <li>Select a subject tab above (Chemistry, Biology, Physics, or Earth & Space).</li>
              <li>Use the dropdown to choose a simulation relevant to your learning goals.</li>
              <li>Interact with the simulation to explore scientific concepts that underpin modern agriculture and farming.</li>
              <li>Apply your understanding to real-world scenarios in soil health, plant growth, nutrient cycles, weather, and sustainability.</li>
            </ul>
            <p className="text-muted-foreground max-w-2xl text-center">
              These interactive simulations are curated to help you build a strong foundation in the sciences that support successful and sustainable agricultural practices.
            </p>
          </div>
        </TabsContent>
        {/* Chemistry Simulations */}
        <TabsContent value="chemistry" className="w-full">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium">Select Simulation:</label>
              <Select value={selectedChemistrySim} onValueChange={setSelectedChemistrySim}>
                <SelectTrigger className="w-[300px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CHEMISTRY_SIMS.map(sim => (
                    <SelectItem key={sim.key} value={sim.key}>
                      {sim.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-full rounded-lg overflow-hidden border shadow bg-white p-6">
              <h2 className="text-2xl font-semibold mb-4">{getCurrentSim(CHEMISTRY_SIMS, selectedChemistrySim).title}</h2>
              <iframe
                src={getCurrentSim(CHEMISTRY_SIMS, selectedChemistrySim).iframe}
                title={getCurrentSim(CHEMISTRY_SIMS, selectedChemistrySim).title}
                width="100%"
                height="600"
                style={{ border: 'none', minHeight: 500, width: '100%', display: 'block' }}
                allowFullScreen
              />
            </div>
          </div>
        </TabsContent>
        {/* Biology Simulations */}
        <TabsContent value="biology" className="w-full">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium">Select Simulation:</label>
              <Select value={selectedBiologySim} onValueChange={setSelectedBiologySim}>
                <SelectTrigger className="w-[300px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {BIOLOGY_SIMS.map(sim => (
                    <SelectItem key={sim.key} value={sim.key}>
                      {sim.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-full rounded-lg overflow-hidden border shadow bg-white p-6">
              <h2 className="text-2xl font-semibold mb-4">{getCurrentSim(BIOLOGY_SIMS, selectedBiologySim).title}</h2>
              <iframe
                src={getCurrentSim(BIOLOGY_SIMS, selectedBiologySim).iframe}
                title={getCurrentSim(BIOLOGY_SIMS, selectedBiologySim).title}
                width="100%"
                height="600"
                style={{ border: 'none', minHeight: 500, width: '100%', display: 'block' }}
                allowFullScreen
              />
            </div>
          </div>
        </TabsContent>
        {/* Physics Simulations */}
        <TabsContent value="physics" className="w-full">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium">Select Simulation:</label>
              <Select value={selectedPhysicsSim} onValueChange={setSelectedPhysicsSim}>
                <SelectTrigger className="w-[300px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PHYSICS_SIMS.map(sim => (
                    <SelectItem key={sim.key} value={sim.key}>
                      {sim.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-full rounded-lg overflow-hidden border shadow bg-white p-6">
              <h2 className="text-2xl font-semibold mb-4">{getCurrentSim(PHYSICS_SIMS, selectedPhysicsSim).title}</h2>
              <iframe
                src={getCurrentSim(PHYSICS_SIMS, selectedPhysicsSim).iframe}
                title={getCurrentSim(PHYSICS_SIMS, selectedPhysicsSim).title}
                width="100%"
                height="600"
                style={{ border: 'none', minHeight: 500, width: '100%', display: 'block' }}
                allowFullScreen
              />
            </div>
          </div>
        </TabsContent>
        {/* Earth & Space Simulations */}
        <TabsContent value="earth-space" className="w-full">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium">Select Simulation:</label>
              <Select value={selectedEarthSpaceSim} onValueChange={setSelectedEarthSpaceSim}>
                <SelectTrigger className="w-[300px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {EARTH_SPACE_SIMS.map(sim => (
                    <SelectItem key={sim.key} value={sim.key}>
                      {sim.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-full rounded-lg overflow-hidden border shadow bg-white p-6">
              <h2 className="text-2xl font-semibold mb-4">{getCurrentSim(EARTH_SPACE_SIMS, selectedEarthSpaceSim).title}</h2>
              <iframe
                src={getCurrentSim(EARTH_SPACE_SIMS, selectedEarthSpaceSim).iframe}
                title={getCurrentSim(EARTH_SPACE_SIMS, selectedEarthSpaceSim).title}
                width="100%"
                height="600"
                style={{ border: 'none', minHeight: 500, width: '100%', display: 'block' }}
                allowFullScreen
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SimulationsPage; 