import { MEMBER_API } from "./constants";

/**
 * Returns Member data from API
 * @returns {Promise<Record<string, any>>}
 */
export const fetchMemberData = async (): Promise<Record<string, any>> => {
  const res = await fetch(MEMBER_API);

  if (!res.ok) {
    throw new Error("Unable to fetch member data");
  }

  return res.json() as Record<string, any>;
};

/**
 * Parses API response and returns a list of members
 * @param data - API response
 * @returns {Record<string ,any>[]}
 */
export const getMembers = (
  data: Record<string, any>
): Record<string, any>[] => {
  return data?.MemberData?.members?.member || [];
};

/**
 * Parses API response and returns a list of committees and subcommittees
 * @param data - API response
 * @returns {Record<string ,any>[]}
 */
export const getCommittees = (
  data: Record<string, any>
): Record<string, any>[] => {
  return data?.MemberData?.committees?.committee || [];
};

/**
 * Parses Member data and returns the member's name
 * @param member
 * @returns {string}
 */
export const getMemberName = (member: Record<string, any>): string => {
  return member?.["member-info"]?.namelist || "";
};

/**
 * Helper method to check if searched name is in the list of members
 * @param members
 * @param searchedWords
 * @returns {Array<any>}
 */
export const getMembersByName = (
  members: Array<any>,
  searchedWords: string
): Array<any> => {
  const words: Array<string> = searchedWords.split(" ");
  var filteredMembers = members.filter((e) => {
    // Change namelist into lowercase for easy comparison
    const fullName = e?.["member-info"].namelist;
    if (!fullName) return false;
    const lowerName = fullName.toLowerCase();

    // Check if the searched words are in the member's full name
    for (const word of words) {
      const lowerWord = word.toLowerCase();
      if (lowerName.indexOf(lowerWord) == -1) return false;
    }
    return true;
  });

  return filteredMembers;
};

/**
 * Helper method to return all relevant subcommittees
 * @param comcode
 * @param subcommittees
 * @param committeesInfo
 * @returns {Record<string,any>[]}
 */
export const getSubcommitteesNames = (
  comcode: string,
  subcommittees: Record<string, any>[],
  committeesInfo: Record<string, any>[]
) => {
  return subcommittees
    .filter((e) => {
      const subcomcode = e?.["@subcomcode"];
      return subcomcode ? subcomcode.includes(comcode.slice(0, 2)) : false;
    })
    .map((e) => {
      const committeeInfo = findCommitteeInfo(
        e?.["@subcomcode"],
        committeesInfo
      );

      const subcommittee =
        committeeInfo && committeeInfo?.subcommittee
          ? committeeInfo?.subcommittee.find(
              (subcommittee) =>
                subcommittee?.["@subcomcode"] === e?.["@subcomcode"]
            )
          : {};

      return subcommittee
        ? subcommittee?.["subcommittee-fullname"]
        : e?.["@subcomcode"];
    });
};

/**
 * Helper method to find information about the committee
 * @param code
 * @param committeesInfo
 * @returns {Record<string,any>}
 */
export const findCommitteeInfo = (
  code: string,
  committeesInfo: Array<Record<string, any>>
) => committeesInfo.find((e) => e?.["@comcode"].includes(code.slice(0, 2)));
