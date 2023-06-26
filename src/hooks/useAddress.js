import { useMemo } from 'react';
import { useGetAddressQuery } from '../redux/features/address/addressApi';

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

  const get_ward_commune = useMemo(() => {
    let communes = [];

    if (cities) {
      for (let district of cities?.flatMap((c) => c?.district || [])) {
        communes.push({
          label:  district?.name,
          options: district?.ward_commune?.map((value) => ({
            value: value?.code,
            label: value?.name,
          })),
        });
      }
    }

    return communes;
  }, [cities]);

  return { getCity, getDistrict, get_ward_commune, isLoading, error, isError };
};
