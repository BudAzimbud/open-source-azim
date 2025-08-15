import Footer from "@/components/Footer";
import CommentSection from "@/components/CommentSection";
import Image from "next/image";
import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { workspaceList } from "@/datas/workspace";
import { useRouter } from "next/router";

// Hotspot Component for better organization
function HotspotComponent({
  object,
  isEditMode,
  isSelected,
  isHovered,
  onSelect,
  onHover,
  onDelete,
  onUpdatePosition,
}: {
  object: SetupObject;
  isEditMode: boolean;
  isSelected: boolean;
  isHovered: boolean;
  onSelect: (id: number) => void;
  onHover: (id: number | null) => void;
  onDelete: (id: number) => void;
  onUpdatePosition: (id: number, x: number, y: number) => void;
}) {
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isEditMode) return;
    e.preventDefault();
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !isEditMode) return;

    const container = e.currentTarget.closest(".relative");
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    onUpdatePosition(
      object.id,
      Math.max(0, Math.min(100, x)),
      Math.max(0, Math.min(100, y))
    );
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      className={`absolute transform -translate-x-1/2 -translate-y-1/2 group ${
        isEditMode ? "cursor-move" : "cursor-pointer"
      }`}
      style={{
        left: `${object.position.x}%`,
        top: `${object.position.y}%`,
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(object.id);
      }}
      onMouseEnter={() => onHover(object.id)}
      onMouseLeave={(e) => {
        // Only remove hover if mouse is not entering the delete button
        const related = e.relatedTarget as HTMLElement | null;
        if (!related || !related.classList.contains('hotspot-delete-btn')) {
          onHover(null);
        }
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* Dot dengan glow effect */}
      <div
        className={`
        w-4 h-4 rounded-full border-2 border-white transition-all duration-300 relative z-10 glow-pulse
        ${
          isSelected
            ? "bg-blue-600 scale-150 shadow-lg"
            : isHovered
            ? "bg-blue-500 scale-125 shadow-md"
            : "bg-blue-400 hover:bg-blue-500 hover:scale-110"
        }
        ${isEditMode ? "ring-2 ring-yellow-400 ring-opacity-50" : ""}
      `}
      >
        {/* Inner core glow */}
        <div className="absolute inset-0 rounded-full bg-white opacity-60 animate-pulse"
             style={{ animationDuration: '1.5s' }}></div>
      </div>

      {/* Multi-layer signal animation */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Primary radar wave */}
        <div className="absolute inset-0 rounded-full border-2 border-blue-400 radar-ping" 
             style={{ animationDelay: '0s' }}></div>
        
        {/* Secondary signal wave */}
        <div className="absolute inset-0 rounded-full border border-blue-300 signal-wave" 
             style={{ animationDelay: '0.8s' }}></div>
        
        {/* Tertiary distant wave */}
        <div className="absolute inset-0 rounded-full border border-blue-200 radar-ping" 
             style={{ 
               animationDelay: '1.5s',
               animationDuration: '4s'
             }}></div>

        {/* Background pulse untuk depth */}
        <div className="absolute inset-0 rounded-full bg-blue-400 opacity-5 animate-ping"
             style={{ 
               animationDuration: '3s',
               transform: 'scale(5)'
             }}></div>
      </div>

      {/* Edit Mode Controls: always show delete button in edit mode */}
      {isEditMode && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 flex gap-1 z-20">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(object.id);
            }}
            className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded hotspot-delete-btn shadow-lg"
            title="Delete Hotspot"
          >
            ×
          </button>
        </div>
      )}

      {/* Hover Tooltip */}
      {isHovered && !isSelected && !isEditMode && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black/90 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap z-20">
          {object.name}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black/90"></div>
        </div>
      )}

      {/* Position indicator in edit mode */}
      {isEditMode && isHovered && (
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-black text-xs px-2 py-1 rounded z-20">
          {Math.round(object.position.x)}, {Math.round(object.position.y)}
        </div>
      )}

      {/* Extra attention grabber - rotating ring */}
      {!isEditMode && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 rounded-full border-2 border-blue-300 opacity-30 animate-spin"
               style={{ 
                 animationDuration: '8s',
                 transform: 'scale(2.5)',
                 borderStyle: 'dashed'
               }}></div>
        </div>
      )}
    </div>
  );
}

// Define the type for setup objects
interface SetupObject {
  id: number;
  name: string;
  position: { x: number; y: number };
  description: string;
  link?: string; // Optional link field
}

// Define the objects in your computer setup (Start with empty array)
const setupObjects: SetupObject[] = [
  // Empty - you can add your own hotspots using the editor
];

export default function Store() {
  const router = useRouter();
  const slug = router.query.slug as string;
  const workspace = workspaceList.find(ws => ws.id === slug);
  const [selectedObject, setSelectedObject] = useState<number | null>(null);
  const [hoveredObject, setHoveredObject] = useState<number | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editableObjects, setEditableObjects] = useState<SetupObject[]>(setupObjects);
  // Load editableObjects from localStorage after slug is available
  useEffect(() => {
    if (typeof window !== "undefined" && slug) {
      const saved = localStorage.getItem(`editableObjects-${slug}`);
      if (saved) {
        try {
          setEditableObjects(JSON.parse(saved));
        } catch {
          setEditableObjects(setupObjects);
        }
      } else {
        setEditableObjects(setupObjects);
      }
    }
    // eslint-disable-next-line
  }, [slug]);
  // Persist editableObjects to localStorage whenever it changes
  // and slug is available
  useEffect(() => {
    if (typeof window !== "undefined" && slug) {
      localStorage.setItem(`editableObjects-${slug}`, JSON.stringify(editableObjects));
    }
  }, [editableObjects, slug]);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [isWaitingForPosition, setIsWaitingForPosition] = useState(false);
  const [isEditingObject, setIsEditingObject] = useState(false);
  const [newObjectData, setNewObjectData] = useState({
    name: "",
    description: "",
    link: "",
  });
  const [editingObjectData, setEditingObjectData] =
    useState<SetupObject | null>(null);

  // Handle clicking on image to add new hotspot
  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isEditMode || !isWaitingForPosition) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const newId =
      editableObjects.length > 0
        ? Math.max(...editableObjects.map((obj) => obj.id)) + 1
        : 1;
    const newObject: SetupObject = {
      id: newId,
      name: newObjectData.name || `Item ${newId}`,
      description: newObjectData.description || "New item description",
      position: { x: Math.round(x), y: Math.round(y) },
      link: newObjectData.link || "",
    };

    setEditableObjects([...editableObjects, newObject]);
    setIsWaitingForPosition(false);
    setNewObjectData({
      name: "",
      description: "",
      link: "",
    });
  };

  // Delete hotspot
  const deleteObject = (id: number) => {
    setEditableObjects(editableObjects.filter((obj) => obj.id !== id));
    setSelectedObject(null);
  };

  // Update object position by dragging
  const updateObjectPosition = (id: number, newX: number, newY: number) => {
    setEditableObjects(
      editableObjects.map((obj) =>
        obj.id === id
          ? { ...obj, position: { x: Math.round(newX), y: Math.round(newY) } }
          : obj
      )
    );
  };

  // Edit object data
  const startEditingObject = (object: SetupObject) => {
    setEditingObjectData({ ...object });
    setIsEditingObject(true);
    setSelectedObject(null);
  };

  const saveObjectEdits = () => {
    if (!editingObjectData) return;

    setEditableObjects(
      editableObjects.map((obj) =>
        obj.id === editingObjectData.id ? editingObjectData : obj
      )
    );
    setIsEditingObject(false);
    setEditingObjectData(null);
  };

  const cancelObjectEdits = () => {
    setIsEditingObject(false);
    setEditingObjectData(null);
  };

  // Handle placing new object
  const startPlacingNewObject = () => {
    setIsAddingNew(false);
    setIsWaitingForPosition(true);
  };

  const cancelPlacing = () => {
    setIsWaitingForPosition(false);
    setNewObjectData({
      name: "",
      description: "",
      link: "",
    });
  };

  return (
    <>
      <Navigation />
      {/* Custom styles untuk animasi signal */}
      <style jsx global>{`
        @keyframes radar-ping {
          0% {
            transform: scale(1);
            opacity: 0.8;
          }
          50% {
            opacity: 0.4;
          }
          100% {
            transform: scale(4);
            opacity: 0;
          }
        }
        
        @keyframes signal-wave {
          0% {
            transform: scale(1);
            opacity: 0.6;
          }
          100% {
            transform: scale(3.5);
            opacity: 0;
          }
        }
        
        @keyframes glow-pulse {
          0%, 100% {
            box-shadow: 0 0 5px rgba(59, 130, 246, 0.5), 0 0 10px rgba(59, 130, 246, 0.3);
          }
          50% {
            box-shadow: 0 0 10px rgba(59, 130, 246, 0.8), 0 0 20px rgba(59, 130, 246, 0.5), 0 0 30px rgba(59, 130, 246, 0.3);
          }
        }
        
        .radar-ping {
          animation: radar-ping 3s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        
        .signal-wave {
          animation: signal-wave 2.5s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        
        .glow-pulse {
          animation: glow-pulse 2s ease-in-out infinite;
        }
      `}</style>
      
      <div className="min-h-screen bg-gray-50">
      <div className="bg-white mt-17 shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-light text-gray-900">
                My Setup Store
              </h1>
              <p className="text-gray-600 mt-2">
                {isEditMode
                  ? isWaitingForPosition
                    ? "Click anywhere on the image to place your new hotspot"
                    : "Edit mode: Add new items, drag to move, or click to edit existing ones"
                  : "Click on any item in my setup to learn more and shop"}
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => {
                  setIsEditMode(!isEditMode);
                  setIsAddingNew(false);
                  setIsWaitingForPosition(false);
                  setSelectedObject(null);
                }}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  isEditMode
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                {isEditMode ? "Exit Edit" : "Edit Mode"}
              </button>
              {isEditMode && (
                <button
                  onClick={() => setIsAddingNew(true)}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Add New
                </button>
              )}
              {isWaitingForPosition && (
                <button
                  onClick={cancelPlacing}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Cancel Placing
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

    

      {/* Interactive Setup Image */}
      <div className="max-w-7xl  mx-auto px-8 py-12">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="relative">
            {/* Your actual setup image */}
            <div
              className={`relative h-96 md:h-[600px] bg-gray-900 ${
                isEditMode && isWaitingForPosition ? "cursor-crosshair" : ""
              }`}
              onClick={handleImageClick}
            >
              <Image
                src={workspace?.image || "/file.svg"}
                alt="Computer Setup"
                fill
                className="object-cover"
                style={{
                  background: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600"><rect width="1200" height="600" fill="%23374151"/><text x="600" y="300" text-anchor="middle" fill="%23fff" font-size="24" font-family="Arial">Your Setup Image Here</text></svg>') center/cover`,
                }}
              />

              {/* Grid overlay in edit mode */}
              {isEditMode && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="w-full h-full opacity-20">
                    {/* Grid lines */}
                    <svg className="w-full h-full">
                      {[...Array(11)].map((_, i) => (
                        <g key={i}>
                          <line
                            x1={`${i * 10}%`}
                            y1="0%"
                            x2={`${i * 10}%`}
                            y2="100%"
                            stroke="white"
                            strokeWidth="1"
                            opacity="0.3"
                          />
                          <line
                            x1="0%"
                            y1={`${i * 10}%`}
                            x2="100%"
                            y2={`${i * 10}%`}
                            stroke="white"
                            strokeWidth="1"
                            opacity="0.3"
                          />
                        </g>
                      ))}
                    </svg>
                  </div>
                </div>
              )}

              {/* Clickable Hotspots */}
              {editableObjects.map((object) => (
                <HotspotComponent
                  key={object.id}
                  object={object}
                  isEditMode={isEditMode}
                  isSelected={selectedObject === object.id}
                  isHovered={hoveredObject === object.id}
                  onSelect={setSelectedObject}
                  onHover={setHoveredObject}
                  onDelete={deleteObject}
                  onUpdatePosition={updateObjectPosition}
                />
              ))}

              {/* Instructions overlay */}
              {isEditMode && isWaitingForPosition && (
                <div className="absolute top-4 left-4 bg-black/80 text-white p-4 rounded-lg">
                  <p className="text-sm font-medium mb-2">📍 Place New Hotspot</p>
                  <p className="text-xs">
                    Click anywhere on the image to place your hotspot
                  </p>
                  <p className="text-xs mt-2 text-yellow-300">
                    {newObjectData.name || "Unnamed Item"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

        {/* Editor Panel */}
      {isEditMode && !isWaitingForPosition && (
        <div className="max-w-7xl mx-auto px-8 pb-6">
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">🎯 Editor Mode</h3>
            
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                <span>Click hotspots to edit</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <span>Drag hotspots to move</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <span>Click × to delete</span>
              </div>
            </div>

            <div className="mt-4 flex gap-4">
              <button
                onClick={() => {
                  console.log(
                    "Export data:",
                    JSON.stringify(editableObjects, null, 2)
                  );
                  alert("Check console for exported data");
                }}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm"
              >
                Export Data
              </button>
              <button
                onClick={() => {
                  setEditableObjects(setupObjects);
                  alert("Reset to original setup");
                }}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Product Details Panel - Simple View/Edit Modal */}
      {selectedObject && !isEditingObject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full">
            <div className="p-6">
              {(() => {
                const object = editableObjects.find(
                  (obj) => obj.id === selectedObject
                );
                if (!object) return null;

                return (
                  <>
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <h2 className="text-2xl font-light text-gray-900">
                        {object.name}
                      </h2>
                      <button
                        onClick={() => setSelectedObject(null)}
                        className="bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors"
                      >
                        <svg
                          className="w-5 h-5 text-gray-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>

                    {/* Content */}
                    <div className="space-y-3 mb-6">
                      <div>
                        <span className="text-sm text-gray-500">
                          Description:
                        </span>
                        <p className="text-gray-700">{object.description}</p>
                      </div>
                      {object.link && (
                        <div>
                          <span className="text-sm text-gray-500">Link:</span>
                          <a
                            href={object.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 underline block truncate"
                          >
                            {object.link}
                          </a>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => startEditingObject(object)}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                      >
                        Edit
                      </button>
                      {object.link && (
                        <button
                          onClick={() => window.open(object.link, "_blank")}
                          className="flex-1 border border-gray-300 hover:border-gray-400 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors"
                        >
                          Visit Link
                        </button>
                      )}
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      {/* Add New Object Modal */}
      {isAddingNew && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-light text-gray-900">Add New Item</h2>
                <button
                  onClick={() => setIsAddingNew(false)}
                  className="bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors"
                >
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={newObjectData.name}
                    onChange={(e) =>
                      setNewObjectData({
                        ...newObjectData,
                        name: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    placeholder="Enter item name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={newObjectData.description}
                    onChange={(e) =>
                      setNewObjectData({
                        ...newObjectData,
                        description: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    rows={4}
                    placeholder="Enter item description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Link (optional)
                  </label>
                  <input
                    type="url"
                    value={newObjectData.link}
                    onChange={(e) =>
                      setNewObjectData({
                        ...newObjectData,
                        link: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    placeholder="https://example.com"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={startPlacingNewObject}
                  disabled={!newObjectData.name.trim() || !newObjectData.description.trim()}
                  className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-2 px-4 rounded-lg font-medium transition-colors"
                >
                  📍 Place on Image
                </button>
                <button
                  onClick={() => {
                    setIsAddingNew(false);
                    setNewObjectData({
                      name: "",
                      description: "",
                      link: "",
                    });
                  }}
                  className="flex-1 border border-gray-300 hover:border-gray-400 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Object Modal */}
      {isEditingObject && editingObjectData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-light text-gray-900">Edit Item</h2>
                <button
                  onClick={cancelObjectEdits}
                  className="bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors"
                >
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={editingObjectData.name}
                    onChange={(e) =>
                      setEditingObjectData({
                        ...editingObjectData,
                        name: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={editingObjectData.description}
                    onChange={(e) =>
                      setEditingObjectData({
                        ...editingObjectData,
                        description: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    rows={4}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Link (optional)
                  </label>
                  <input
                    type="url"
                    value={editingObjectData.link || ""}
                    onChange={(e) =>
                      setEditingObjectData({
                        ...editingObjectData,
                        link: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    placeholder="https://example.com"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={saveObjectEdits}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                >
                  Save Changes
                </button>
                <button
                  onClick={cancelObjectEdits}
                  className="flex-1 border border-gray-300 hover:border-gray-400 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="max-w-7xl mx-auto px-8 pb-12">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Interactive Setup Guide {isEditMode && "(Edit Mode)"}
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {editableObjects.map((object) => (
              <button
                key={object.id}
                onClick={() => setSelectedObject(object.id)}
                className={`
                  text-left p-4 rounded-xl border transition-all duration-200
                  ${
                    selectedObject === object.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }
                  ${isEditMode ? "ring-1 ring-yellow-300" : ""}
                `}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className={`
                    w-3 h-3 rounded-full
                    ${
                      selectedObject === object.id
                        ? "bg-blue-500"
                        : "bg-gray-400"
                    }
                  `}
                  ></div>
                  <span className="font-medium text-gray-900">
                    {object.name}
                  </span>
                  {isEditMode && (
                    <span className="text-xs text-gray-500">
                      ({object.position.x}, {object.position.y})
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 truncate">
                  {object.description}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Workspace Info Section */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Workspace Details */}
            <div className="md:col-span-2">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{workspace?.title || "Workspace"}</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {workspace?.description || "No description available."}
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-2">Setup Type</h3>
                  <p className="text-gray-600">{workspace?.category || "-"}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-2">Total Items</h3>
                  <p className="text-gray-600">{workspace?.itemCount ?? editableObjects.length} components</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-2">Last Updated</h3>
                  <p className="text-gray-600">
                    {workspace?.lastUpdated
                      ? new Date(workspace.lastUpdated).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                        })
                      : "-"}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-2">Tags</h3>
                  <p className="text-gray-600">{workspace?.tags?.join(", ") || "-"}</p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">👁️ Views</span>
                  <span className="font-medium text-gray-900">2,847</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">❤️ Likes</span>
                  <span className="font-medium text-gray-900">156</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">💬 Comments</span>
                  <span className="font-medium text-gray-900">23</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">🔖 Bookmarks</span>
                  <span className="font-medium text-gray-900">89</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 space-y-3">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  Like This Setup
                </button>
                <button className="w-full border border-gray-300 hover:border-gray-400 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                  Bookmark
                </button>
                <button className="w-full border border-gray-300 hover:border-gray-400 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                  Share Setup
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="max-w-7xl mx-auto px-8 pb-12">
        <CommentSection workspaceId="current-workspace" />
      </div>

      <Footer />
      </div>
    </>
  );
}
