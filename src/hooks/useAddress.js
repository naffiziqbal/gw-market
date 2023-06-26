import { useGetAddressQuery } from "../redux/features/address/addressApi";

const useAddress = (userCity, userDistrict) => {
  const { data, isLoading, isError, error } = useGetAddressQuery();

  // get city
  const getCity = data?.data?.province_city?.map((c) => {
    return { value: c?.name, code: c?.code };
  });

  // find user city
  const findCity = data?.data?.province_city?.find((c) => c?.name === userCity);
  // Get district based on user's city
  const getDistrict = findCity?.district?.map((d) => ({
    name: d.name,
    code: d.code,
  }));

  // find user district
  const findDistrict = findCity?.district?.find((d) => d.name === userDistrict);
  // Get ward commune based on user's district
  const get_ward_commune = findDistrict?.ward_commune?.map((wc) => ({
    name: wc.name,
    code: wc.code,
  }));

  return { getCity, getDistrict, get_ward_commune, isLoading };
};

export default useAddress;
