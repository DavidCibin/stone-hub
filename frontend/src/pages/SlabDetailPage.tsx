import { useParams, useNavigate } from "react-router-dom";
import { useSlabDetails } from "../hooks/apiHook";
import { useMainContext } from "../context/MainContext";

function SlabDetailPage() {
  const { param } = useParams<{ param: string }>();
  const { data: slabs } = useSlabDetails(param || "");
  const [name, material] = (param ?? "").split("&");

  const navigate = useNavigate();
  const { isLoading } = useMainContext();

  if (isLoading) {
    return null;
  }

  if (!slabs.length) {
    return (
      <div className="p-6">
        <p className="text-red-600">Slab not found.</p>
        <button
          onClick={() => navigate("/inventory")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Back to Inventory
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex flex-col gap-10">
        <div className="grid md:grid-cols-2 gap-6">
          <button onClick={() => navigate(-1)} className="text-white w-fit">
            Back
          </button>
          <div className="flex gap-2 items-baseline w-full">
            <h1 className="uppercase text-2xl font-bold">{name}</h1>
            <p className="text-lg text-gray-700">{material}</p>
          </div>
        </div>
        {slabs.map((slab) => (
          <div key={slab.SlabID} className="grid md:grid-cols-2 gap-6">
            <img
              src={`https://slabcloud.com/slabs/v2/${slab.SlabID.toLowerCase()}.jpg`}
              alt={slab.Name}
              className="w-full h-auto object-cover rounded"
            />
            <div>
              <div>
                <div className="table-row">
                  <div className="table-cell border-b-gray-300 border-b font-medium pb-1">
                    Finish:
                  </div>
                  <div className="table-cell border-b-gray-300 border-b pl-5">
                    {slab.Finish}
                  </div>
                </div>
                <div className="table-row">
                  <div className="table-cell border-b-gray-300 border-b font-medium pb-1">
                    Thickness:
                  </div>
                  <div className="table-cell border-b-gray-300 border-b pl-5 pt-2">
                    {slab.Thickness_Nominal}
                  </div>
                </div>
                <div className="table-row">
                  <div className="table-cell border-b-gray-300 border-b font-medium pb-1">
                    Dimensions:
                  </div>
                  <div className="table-cell border-b-gray-300 border-b pl-5 pt-2">{`${Math.round(slab.Length_Actual * 39.3701)}″ x ${Math.round(slab.Width_Actual * 39.3701)}″`}</div>
                </div>
                <div className="table-row">
                  <div className="table-cell border-b-gray-300 border-b font-medium pb-1">
                    Total Area:
                  </div>
                  <div className="table-cell border-b-gray-300 border-b pl-5 pt-2">{`${Math.round(slab.UsableArea * 10.7639)} ft²`}</div>
                </div>
                <div className="table-row">
                  <div className="table-cell border-b-gray-300 border-b font-medium pb-1">
                    Color Tones:
                  </div>
                  <div className="table-cell border-b-gray-300 border-b pl-5 pt-2 capitalize">
                    {slab.colors.map((color) => color).join(", ")}
                  </div>
                </div>
                <div className="table-row">
                  <div className="table-cell border-b-gray-300 border-b font-medium pb-1">
                    Item Id:
                  </div>
                  <div className="table-cell border-b-gray-300 border-b pl-5 pt-2">
                    {slab.InventoryID}
                  </div>
                </div>
                <div className="table-row">
                  <div className="table-cell font-medium pb-1">
                    Country of Origin:
                  </div>
                  <div className="table-cell pl-5 pt-2">
                    {slab.Origin ? slab.Origin : "--"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SlabDetailPage;
