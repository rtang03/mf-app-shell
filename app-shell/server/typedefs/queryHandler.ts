export default `
  type Query {
    """
    Summary of entities in query handler
    """
    getEntityInfo: [EntityInfo!]!
    """
    Full text search of commit
    """
    fullTextSearchCommit(query: String!, cursor: Int, pagesize: Int): PaginatedCommit!
    """
    Full text search of entity
    """
    fullTextSearchEntity(query: String!, cursor: Int, pagesize: Int): PaginatedEntity!
    """
    Parametric query to return paginated entities
    """
    paginatedEntity(
      creator: String
      cursor: Int
      pagesize: Int
      entityName: String!
      id: String
      scope: SearchScope
      startTime: Int
      endTime: Int
      sortByField: String
      sort: String
    ): PaginatedEntity!
    """
    Parametric query to return paginated commits
    """
    paginatedCommit(
      creator: String
      cursor: Int
      pagesize: Int
      entityName: String!
      id: String
      events: [String!]
      startTime: Int
      endTime: Int
      sortByField: String
      sort: String
    ): PaginatedCommit!
    """
    Return lists of unread notifications
    """
    getNotifications: [Notification!]!
    """
    Return notification details
    """
    getNotification(entityName: String, id: String, commitId: String): Notification!
  }

  type Mutation {
    ###
    # e.g. payloadString
    # "{"id":"test_12","desc":"desc12","tag":"gw-lib"}"
    ###
    """
    create new commmit for dev / testing purpose
    """
    createCommit(entityName: String, id: String, type: String, payloadString: String): Commit!
  }

  # Notification details
  type Notification {
    creator: String!
    entityName: String!
    id: String!
    commitId: String!
    read: Boolean!
  }

  # Entity metadata
  type EntityInfo {
    entityName: String!
    total: Int!
    events: [String!]!
    tagged: [String!]!
    creators: [String!]!
    orgs: [String!]!
    totalCommit: Int!
  }

  enum SearchScope {
    CREATED
    LAST_MODIFIED
  }

  type PaginatedEntity {
    total: Int
    cursor: Int
    hasMore: Boolean!
    items: [QueryHandlerEntity!]!
  }

  type PaginatedCommit {
    total: Int
    cursor: Int
    hasMore: Boolean!
    items: [Commit!]!
  }

  # Generic entity in query handler
  type QueryHandlerEntity {
    id: String!
    entityName: String!
    value: String!
    commits: [String!]!
    events: String!
    desc: String
    tag: String
    created: Float!
    creator: String!
    lastModified: Float!
    timeline: String!
  }

  # Generict commit in query handler
  type Commit {
    id: String
    mspId: String
    entityName: String
    version: Int
    commitId: String
    entityId: String
    eventsString: String
  }
`;
