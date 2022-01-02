export const addRun = `mutation AddRun($input: AddRunInput!) {
  addRun(input: $input) {
    id
    name
    runs
  }
}
`;