export const getBatsman = `query GetBatsman($id: ID!) {
  getBatsman(id: $id) {
    id
    name
    runs
  }
}
`;
export const listBatsmans = `query ListBatsmans(
  $filter: ModelBatsmanFilterInput
  $limit: Int
  $nextToken: String
) {
  listBatsmans(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      runs
    }
    nextToken
  }
}
`;