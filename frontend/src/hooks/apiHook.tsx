import { useEffect, useState } from "react";
import { useMainContext } from "../context/MainContext";
import { API_BASE_URL } from "../config";

export interface Slabs {
  id: string;
  material: string;
  name: string;
  count: number;
  scColor: string;
  slug: string;
  texture: string;
}

interface SlabState {
  data: Slabs[];
}

export interface SlabDetails {
  id: string;
  inventoryId: string;
  usableArea: number;
  lengthActual: number;
  widthActual: number;
  lot: string;
  name: string;
  origin: string | null;
  material: string;
  thicknessNominal: string;
  finish: string;
  scColor: string;
  slug: string;
  colors: string[];
  parentId: string;
}

interface SlabDetailState {
  data: SlabDetails[];
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
              .filter((slab: Slabs) => slab.material)
              .map((slab: Slabs) => slab.material.toLowerCase()),
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

export function useSlabDetails(id: string) {
  const { setIsLoading, setError } = useMainContext();

  const [state, setState] = useState<SlabDetailState>({
    data: [],
  });

  useEffect(() => {
    const fetchSlabDetails = async () => {
      try {
        setIsLoading(true);
        setState((prev) => ({ ...prev }));
        const query = new URLSearchParams({
          id,
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
  }, [id, setIsLoading, setError]);

  return state;
}
