import { useState } from "react";
import {
  plantHealthData,
  animalHealthData,
  soilHealthData,
  humanHealthData,
  planetaryHealthData,
} from "../data/nutrients";

const tabs = [
  { id: "soil", label: "Soil Health", data: [...soilHealthData].sort((a, b) => a.name.localeCompare(b.name)) },
  { id: "plant", label: "Plant Health", data: [...plantHealthData].sort((a, b) => a.name.localeCompare(b.name)) },
  { id: "animal", label: "Animal Health", data: [...animalHealthData].sort((a, b) => a.name.localeCompare(b.name)) },
  { id: "human", label: "Human Health", data: [...humanHealthData].sort((a, b) => a.name.localeCompare(b.name)) },
  { id: "planet", label: "Planetary Health", data: [...planetaryHealthData].sort((a, b) => a.name.localeCompare(b.name)) },
];

export default function TabbedInterface() {
  const [selectedTab, setSelectedTab] = useState("soil");
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  const activeTab = tabs.find((t) => t.id === selectedTab);
  const filteredData = activeTab.data.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-6xl mx-auto px-4 py-6">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-[#8bb439] mb-2">
          The Nutrition Farming Index
        </h1>
        <p className="text-gray-600">
Explore the interconnected web of life through a regenerative lens — uniting Soil Health, Plant Vitality, Animal Wellbeing, Human Nutrition, and Planetary Balance. This living compendium highlights the essential elements, compounds, and biological forces that drive resilience across ecosystems and species alike.
        </p>
      </header>

      <div className="flex flex-wrap gap-2 justify-center">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id)}
            className={`rounded-full px-6 py-2 font-semibold transition shadow-md
              ${selectedTab === tab.id
                ? "text-white"
                : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-100"}
            `}
            style={selectedTab === tab.id ? { background: '#8cb43a' } : {}}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name or category..."
        className="w-full p-2 border rounded shadow"
      />

      {filteredData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredData.map((item, index) => (
            <div
              key={index}
              className="border p-4 rounded shadow bg-white cursor-pointer hover:bg-[#d3e9a4] transition"
              onClick={() => setSelectedItem(item)}
            >
              <h3 className="text-lg font-bold mb-1">{item.name}</h3>
              <p className="text-base text-gray-700 mt-2 line-clamp-4">
                {item.overview || item.description || "No summary available."}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 italic">
          No entries available for this tab.
        </p>
      )}

      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4 py-6">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-xl max-h-[80vh] overflow-y-auto relative">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
            >
              ×
            </button>

            <h3 className="text-3xl font-semibold mb-2">{selectedItem.name}</h3>

            <div className="space-y-6 text-gray-800 text-lg">
              {selectedItem.overview && (
                <div>
                  <p className="font-bold text-lg">Overview</p>
                  <p className="mt-1">{selectedItem.overview}</p>
                </div>
              )}

              {selectedItem.role && (
                <div>
                  <p className="font-bold text-lg">Role in System</p>
                  {Array.isArray(selectedItem.role) ? (
                    <ul className="list-disc list-inside mt-1">
                      {selectedItem.role.map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-1">{selectedItem.role}</p>
                  )}
                </div>
              )}

              {selectedItem.sources?.length > 0 && (
                <div>
                  <p className="font-bold text-lg">Primary Sources</p>
                  <ul className="list-disc list-inside mt-1">
                    {selectedItem.sources.map((source, i) => (
                      <li key={i}>{source}</li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedItem.deficiencySymptoms?.length > 0 && (
                <div>
                  <p className="font-bold text-lg">Deficiency Symptoms</p>
                  <ul className="list-disc list-inside mt-1">
                    {selectedItem.deficiencySymptoms.map((symptom, i) => (
                      <li key={i}>{symptom}</li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedItem.interactions?.length > 0 && (
                <div>
                  <p className="font-bold text-lg">Interactions</p>
                  <ul className="list-disc list-inside mt-1">
                    {selectedItem.interactions.map((interaction, i) => (
                      <li key={i}>{interaction}</li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedItem.impact && (
                <div>
                  <p className="font-bold text-lg">Impact on Health</p>
                  <p className="mt-1">{selectedItem.impact}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 