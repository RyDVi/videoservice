import { Person } from "@modules/api";

export const formatFullName = (d: { firstname: string; lastname: string }) =>
  `${d.lastname} ${d.firstname}`;

export function searchPerson(searchText: string, persons: Person[]) {
  const search = searchText.toLowerCase();
  return persons.filter(
    (person) =>
      person.firstname.toLowerCase().includes(search) ||
      person.lastname.toLowerCase().includes(search)
  );
}
