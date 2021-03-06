export default `
  """
  Qurey schema for Backend-For-Frontend
  """
  type Query {
    ping: String
    """
    return authenticated user from auth-server
    """
    currentUser: User!
  }

  """
  Mutation schema for Backend-For-Frontend
  """
  type Mutation {
    refreshToken: RefreshToken!
    register(email: String!, password: String!, username: String!): RegisteredUser!
    login(password: String!, username: String!): LoggedInUser!
    logout: Boolean!
    forget(email: String!): Boolean
    reset(password: String!, password2: String!): Boolean
    updateProfile(id: String!, email: String!, username: String!): UpdatedProfile!
  }


  # User from auth-server
  type User {
    id: String!
    username: String!
    email: String!
    is_deleted: Boolean!
    is_admin: Boolean!
    password: String!
  }

  type UpdatedProfile {
    ok: Boolean!
    username: String!
    email: String!
  }

  type RefreshToken {
    access_token: String!
    refresh_token: String!
  }

  type RegisteredUser {
    username: String!
    id: String!
  }

  type LoggedInUser {
    username: String!
    id: String!
    access_token: String!
    jwtExpiryInSec: String!
    token_type: String!
  }
`;
