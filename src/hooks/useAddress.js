import { useMemo } from "react";
import { useGetAddressQuery } from "../redux/features/address/addressApi";

export const useAddress = () => {
  const { data, isLoading, isError, error } = useGetAddressQuery();

  const cities = useMemo(() => {
    return data?.data?.province_city?.map((c) => c);
  }, [data?.data?.province_city]);

  const getCity = useMemo(() => {
    if (cities) {
      return cities?.map((c) => ({ label: c?.name, value: c?.code }));
    }
    return [];
  }, [cities]);

  const getDistrict = useMemo(() => {
    if (cities) {
      const districts = cities?.flatMap((c) => c?.district || []);
      return districts?.map((d) => ({ label: d?.name, value: d?.code })) || [];
    }
    return [];
  }, [cities]);

  const get_ward_commune = (district) => {
    if (cities && district) {
      const districts = cities?.flatMap((d) => d?.district);
      const wards = districts?.filter((w) => w?.name === district);

      return wards.flatMap((d) => {
        if (d?.name === district) {
          return d?.ward_commune?.map((value) => ({
            label: value?.name,
            value: value?.code,
          }));
        }
      });
    }
  };

  return { getCity, getDistrict, get_ward_commune, isLoading, error, isError };
};
