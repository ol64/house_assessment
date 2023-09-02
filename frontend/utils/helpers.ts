import { MEMBER_API } from "./constants";

/**
 * Returns Member data from API
 * @returns {Promise<Record<string, any>}
 */
export const fetchMemberData = async (): Promise<Record<string, any>>  => {
  const res = await fetch(MEMBER_API);

  if (!res.ok) {
    throw new Error('Unable to fetch member data');
  }

  return res.json() as Record<string, any>;
}

/**
 * Parses API response and returns a list of members
 * @param data - API response
 * @returns {Record<string ,any>[]}
 */
export const getMembers = (data: Record<string, any>): Record<string, any>[] => {
  return data?.MemberData?.members?.member || [];
}

/**
 * Parses Member data and returns the member's name
 * @param member
 * @returns {string}
 */
export const getMemberName = (member: Record<string, any>): string => {
  return member?.['member-info']?.namelist || '';
};



/**
 * Helper method to check if searched name is in the list of members
 * @param members
 * @param searchedWords
 * @returns {Array<any>}
 */
export const getMembersByName = (members: Array<any>, searchedWords: string): Array<any> => {
  const words: Array<string> = searchedWords.split(" ")
  var filteredMembers = members.filter((e) => {
    // Change namelist into lowercase for easy comparison
    const fullName = e?.['member-info'].namelist
    if (!fullName) return false
    const lowerName = fullName.toLowerCase()

    // Check if the searched words are in the member's full name
    for (const word of words) {
      const lowerWord = word.toLowerCase();
      if (lowerName.indexOf(lowerWord) == -1) return false
    }
    return true
  })
  
  return filteredMembers
}
