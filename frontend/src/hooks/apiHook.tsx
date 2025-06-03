import { useEffect, useState } from "react";
import { useMainContext } from "../context/MainContext";
import { API_BASE_URL } from "../config"; // add this line

export interface Slabs {
  Material: string;
  Name: string;
  SlabID: string;
  count: number;
  scColor: string;
  slug: string;
  texture: string;
}

interface SlabState {
  data: Slabs[];
}

export interface SlabDetail {
  SlabID: string;
  InventoryID: string;
  UsableArea: number;
  Length_Actual: number;
  Width_Actual: number;
  Lot: string;
  Name: string;
  Origin: string | null;
  Material: string;
  Thickness_Nominal: string;
  Finish: string;
  scColor: string;
  slug: string;
  colors: string[];
}

interface SlabDetailState {
  data: SlabDetail[];
}

export function useSlabs() {
  const { setIsLoading, setError, setMaterialsArray } = useMainContext();
  const [state, setState] = useState<SlabState>({ data: [] });

  useEffect(() => {
    const fetchSlabs = async () => {
      try {
        setIsLoading(true);
        setState((prev) => ({ ...prev }));
        const response = await fetch(`${API_BASE_URL}/slabs`);
        if (!response.ok) {
          setError({
            errorMessage: `HTTP error! status: ${response.status}`,
            showError: true,
          });
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const materials = [
          ...new Set(
            data
              .filter((slab: SlabDetail) => slab.Material)
              .map((slab: SlabDetail) => slab.Material.toLowerCase()),
          ),
        ] as string[];
        setState({ data });
        setMaterialsArray(materials);
        setIsLoading(false);
      } catch (err: unknown) {
        setState({
          data: [],
        });
        setError({
          errorMessage:
            err instanceof Error && err.message ? err.message : "Unknown error",
          showError: true,
        });
        setIsLoading(false);
      }
    };

    fetchSlabs();
  }, [setIsLoading, setError, setMaterialsArray]);

  return state;
}

export function useSlabDetails(param: string) {
  const { setIsLoading, setError } = useMainContext();

  const [state, setState] = useState<SlabDetailState>({
    data: [],
  });

  const [slug, mat] = param.split("&");

  useEffect(() => {
    const fetchSlabDetails = async () => {
      try {
        setIsLoading(true);
        setState((prev) => ({ ...prev }));
        const query = new URLSearchParams({
          slug,
          mat,
        });

        const response = await fetch(
          `${API_BASE_URL}/slab-details?${query.toString()}`,
        );

        if (!response.ok) {
          setError({
            errorMessage: `HTTP error! status: ${response.status}`,
            showError: true,
          });
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setState({ data });
        setIsLoading(false);
      } catch (err: unknown) {
        setState({
          data: [],
        });
        setError({
          errorMessage:
            err instanceof Error && err.message ? err.message : "Unknown error",
          showError: true,
        });
        setIsLoading(false);
      }
    };

    fetchSlabDetails();
  }, [slug, mat, setIsLoading, setError]);

  return state;
}
