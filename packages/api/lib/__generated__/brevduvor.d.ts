import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from 'graphql'
export type Maybe<T> = T | null
export type RequireFields<T, K extends keyof T> = {
  [X in Exclude<keyof T, K>]?: T[X]
} &
  { [P in K]-?: NonNullable<T[P]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any
  RuleWrapper: any
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: any
  /** The `Upload` scalar type represents a file upload. */
  Upload: any
}

export type AuthPayload = {
  __typename?: 'AuthPayload'
  id: Scalars['ID']
  token: Scalars['String']
  email: Scalars['String']
  username: Scalars['String']
  language: Maybe<Languages>
}

export type Booking = {
  __typename?: 'Booking'
  id: Scalars['String']
  start: Destination
  stop: Destination
  eta: Scalars['String']
  events: Array<Scalars['String']>
  status: Scalars['String']
}

export enum BookingEvent {
  Booked = 'BOOKED',
  Packed = 'PACKED',
  Sent = 'SENT',
  RecipentNotified = 'RECIPENT_NOTIFIED',
}

export type BookingInput = {
  start: DestinationInput
  stop: DestinationInput
}

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE',
}

export type Coordinates = {
  __typename?: 'Coordinates'
  lat: Scalars['Float']
  lon: Scalars['Float']
}

export type Destination = {
  __typename?: 'Destination'
  alias: Scalars['String']
  lat: Scalars['Float']
  lon: Scalars['Float']
}

export type DestinationInput = {
  alias: Scalars['String']
}

export type Drone = {
  __typename?: 'Drone'
  id: Scalars['Int']
  status: Scalars['String']
  description: Scalars['String']
  name: Scalars['String']
  active: Scalars['Boolean']
}

export type DroneStatusResponse = {
  __typename?: 'DroneStatusResponse'
  id: Scalars['String']
  start: Destination
  stop: Destination
  currentPos: Coordinates
  bearing: Scalars['Int']
  status: Scalars['String']
  batteryStatus: Scalars['Int']
  departure: Scalars['String']
  eta: Scalars['String']
}

export type Geometry = {
  __typename?: 'Geometry'
  type: Scalars['String']
  coordinates: Scalars['JSON']
}

export type HasStartedResponse = {
  __typename?: 'hasStartedResponse'
  id: Scalars['String']
}

export type InitDroneResponse = {
  __typename?: 'InitDroneResponse'
  id: Scalars['String']
  start: Coordinates
  stop: Coordinates
  currentPos: Coordinates
  bearing: Scalars['Int']
  status: Scalars['String']
  batteryStatus: Scalars['Int']
  departure: Scalars['String']
  eta: Scalars['String']
}

export enum Languages {
  English = 'ENGLISH',
  Swedish = 'SWEDISH',
}

export type LogoutResponse = {
  __typename?: 'LogoutResponse'
  status: Scalars['String']
  message: Scalars['String']
}

export type Mutation = {
  __typename?: 'Mutation'
  initDrone: Scalars['String']
  booking: Scalars['String']
  notification: Scalars['Boolean']
  login: AuthPayload
  register: AuthPayload
  startDrone: Scalars['Boolean']
  updateUserLanguage: Scalars['Boolean']
  logout: LogoutResponse
}

export type MutationInitDroneArgs = {
  start: DestinationInput
  stop: DestinationInput
}

export type MutationBookingArgs = {
  start: DestinationInput
  stop: DestinationInput
}

export type MutationNotificationArgs = {
  input: NotificationInput
}

export type MutationLoginArgs = {
  email: Scalars['String']
  password: Scalars['String']
}

export type MutationRegisterArgs = {
  input: RegisterInput
}

export type MutationStartDroneArgs = {
  bookingId: Scalars['String']
}

export type MutationUpdateUserLanguageArgs = {
  email: Scalars['RuleWrapper']
  language: Languages
}

export type NotificationInput = {
  sender: Scalars['String']
  receiver: Scalars['String']
  sentAt: Scalars['String']
  message: Scalars['String']
}

export type Query = {
  __typename?: 'Query'
  allDestinations: Array<Destination>
  getRoute: Route
  drones: Array<Drone>
  bookings: Maybe<Array<Maybe<Booking>>>
}

export type QueryGetRouteArgs = {
  start: DestinationInput
  stop: DestinationInput
}

export type RegisterInput = {
  email: Scalars['RuleWrapper']
  username: Scalars['String']
  password: Scalars['String']
  confirmPassword: Scalars['String']
}

export type Route = {
  __typename?: 'Route'
  trips: Array<Trip>
}

export type Subscription = {
  __typename?: 'Subscription'
  dronePosition: InitDroneResponse
  droneStatus: Maybe<DroneStatusResponse>
  hasStarted: Scalars['String']
}

export type SubscriptionDronePositionArgs = {
  id: Scalars['String']
}

export type SubscriptionDroneStatusArgs = {
  id: Scalars['String']
}

export type Trip = {
  __typename?: 'Trip'
  geoJson: Geometry
  distance: Scalars['Float']
}

export type ResolverTypeWrapper<T> = Promise<T> | T

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult

export type Resolver<
  TResult,
  TParent = {},
  TContext = {},
  TArgs = {}
> = ResolverFn<TResult, TParent, TContext, TArgs>

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>
  Destination: ResolverTypeWrapper<Destination>
  String: ResolverTypeWrapper<Scalars['String']>
  Float: ResolverTypeWrapper<Scalars['Float']>
  DestinationInput: DestinationInput
  Route: ResolverTypeWrapper<Route>
  Trip: ResolverTypeWrapper<Trip>
  Geometry: ResolverTypeWrapper<Geometry>
  JSON: ResolverTypeWrapper<Scalars['JSON']>
  Drone: ResolverTypeWrapper<Drone>
  Int: ResolverTypeWrapper<Scalars['Int']>
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>
  Booking: ResolverTypeWrapper<Booking>
  Mutation: ResolverTypeWrapper<{}>
  NotificationInput: NotificationInput
  AuthPayload: ResolverTypeWrapper<AuthPayload>
  ID: ResolverTypeWrapper<Scalars['ID']>
  Languages: Languages
  RegisterInput: RegisterInput
  RuleWrapper: ResolverTypeWrapper<Scalars['RuleWrapper']>
  LogoutResponse: ResolverTypeWrapper<LogoutResponse>
  Subscription: ResolverTypeWrapper<{}>
  InitDroneResponse: ResolverTypeWrapper<InitDroneResponse>
  Coordinates: ResolverTypeWrapper<Coordinates>
  DroneStatusResponse: ResolverTypeWrapper<DroneStatusResponse>
  BookingEvent: BookingEvent
  BookingInput: BookingInput
  CacheControlScope: CacheControlScope
  hasStartedResponse: ResolverTypeWrapper<HasStartedResponse>
  JSONObject: ResolverTypeWrapper<Scalars['JSONObject']>
  Upload: ResolverTypeWrapper<Scalars['Upload']>
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {}
  Destination: Destination
  String: Scalars['String']
  Float: Scalars['Float']
  DestinationInput: DestinationInput
  Route: Route
  Trip: Trip
  Geometry: Geometry
  JSON: Scalars['JSON']
  Drone: Drone
  Int: Scalars['Int']
  Boolean: Scalars['Boolean']
  Booking: Booking
  Mutation: {}
  NotificationInput: NotificationInput
  AuthPayload: AuthPayload
  ID: Scalars['ID']
  Languages: Languages
  RegisterInput: RegisterInput
  RuleWrapper: Scalars['RuleWrapper']
  LogoutResponse: LogoutResponse
  Subscription: {}
  InitDroneResponse: InitDroneResponse
  Coordinates: Coordinates
  DroneStatusResponse: DroneStatusResponse
  BookingEvent: BookingEvent
  BookingInput: BookingInput
  CacheControlScope: CacheControlScope
  hasStartedResponse: HasStartedResponse
  JSONObject: Scalars['JSONObject']
  Upload: Scalars['Upload']
}

export type MaxLengthDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = { length: Maybe<Maybe<Scalars['Int']>> }
> = DirectiveResolverFn<Result, Parent, ContextType, Args>

export type MinLengthDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = { length: Maybe<Maybe<Scalars['Int']>> }
> = DirectiveResolverFn<Result, Parent, ContextType, Args>

export type IsEmailDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = {}
> = DirectiveResolverFn<Result, Parent, ContextType, Args>

export type IsAuthenticatedDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = {}
> = DirectiveResolverFn<Result, Parent, ContextType, Args>

export type CacheControlDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = {
    maxAge: Maybe<Maybe<Scalars['Int']>>
    scope: Maybe<Maybe<CacheControlScope>>
  }
> = DirectiveResolverFn<Result, Parent, ContextType, Args>

export type AuthPayloadResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['AuthPayload'] = ResolversParentTypes['AuthPayload']
> = {
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  token: Resolver<ResolversTypes['String'], ParentType, ContextType>
  email: Resolver<ResolversTypes['String'], ParentType, ContextType>
  username: Resolver<ResolversTypes['String'], ParentType, ContextType>
  language: Resolver<
    Maybe<ResolversTypes['Languages']>,
    ParentType,
    ContextType
  >
}

export type BookingResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Booking'] = ResolversParentTypes['Booking']
> = {
  id: Resolver<ResolversTypes['String'], ParentType, ContextType>
  start: Resolver<ResolversTypes['Destination'], ParentType, ContextType>
  stop: Resolver<ResolversTypes['Destination'], ParentType, ContextType>
  eta: Resolver<ResolversTypes['String'], ParentType, ContextType>
  events: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>
  status: Resolver<ResolversTypes['String'], ParentType, ContextType>
}

export type CoordinatesResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Coordinates'] = ResolversParentTypes['Coordinates']
> = {
  lat: Resolver<ResolversTypes['Float'], ParentType, ContextType>
  lon: Resolver<ResolversTypes['Float'], ParentType, ContextType>
}

export type DestinationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Destination'] = ResolversParentTypes['Destination']
> = {
  alias: Resolver<ResolversTypes['String'], ParentType, ContextType>
  lat: Resolver<ResolversTypes['Float'], ParentType, ContextType>
  lon: Resolver<ResolversTypes['Float'], ParentType, ContextType>
}

export type DroneResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Drone'] = ResolversParentTypes['Drone']
> = {
  id: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  status: Resolver<ResolversTypes['String'], ParentType, ContextType>
  description: Resolver<ResolversTypes['String'], ParentType, ContextType>
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>
  active: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
}

export type DroneStatusResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['DroneStatusResponse'] = ResolversParentTypes['DroneStatusResponse']
> = {
  id: Resolver<ResolversTypes['String'], ParentType, ContextType>
  start: Resolver<ResolversTypes['Destination'], ParentType, ContextType>
  stop: Resolver<ResolversTypes['Destination'], ParentType, ContextType>
  currentPos: Resolver<ResolversTypes['Coordinates'], ParentType, ContextType>
  bearing: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  status: Resolver<ResolversTypes['String'], ParentType, ContextType>
  batteryStatus: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  departure: Resolver<ResolversTypes['String'], ParentType, ContextType>
  eta: Resolver<ResolversTypes['String'], ParentType, ContextType>
}

export type GeometryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Geometry'] = ResolversParentTypes['Geometry']
> = {
  type: Resolver<ResolversTypes['String'], ParentType, ContextType>
  coordinates: Resolver<ResolversTypes['JSON'], ParentType, ContextType>
}

export type HasStartedResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['hasStartedResponse'] = ResolversParentTypes['hasStartedResponse']
> = {
  id: Resolver<ResolversTypes['String'], ParentType, ContextType>
}

export type InitDroneResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['InitDroneResponse'] = ResolversParentTypes['InitDroneResponse']
> = {
  id: Resolver<ResolversTypes['String'], ParentType, ContextType>
  start: Resolver<ResolversTypes['Coordinates'], ParentType, ContextType>
  stop: Resolver<ResolversTypes['Coordinates'], ParentType, ContextType>
  currentPos: Resolver<ResolversTypes['Coordinates'], ParentType, ContextType>
  bearing: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  status: Resolver<ResolversTypes['String'], ParentType, ContextType>
  batteryStatus: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  departure: Resolver<ResolversTypes['String'], ParentType, ContextType>
  eta: Resolver<ResolversTypes['String'], ParentType, ContextType>
}

export interface JsonScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON'
}

export interface JsonObjectScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['JSONObject'], any> {
  name: 'JSONObject'
}

export type LogoutResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['LogoutResponse'] = ResolversParentTypes['LogoutResponse']
> = {
  status: Resolver<ResolversTypes['String'], ParentType, ContextType>
  message: Resolver<ResolversTypes['String'], ParentType, ContextType>
}

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = {
  initDrone: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType,
    RequireFields<MutationInitDroneArgs, 'start' | 'stop'>
  >
  booking: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType,
    RequireFields<MutationBookingArgs, 'start' | 'stop'>
  >
  notification: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<MutationNotificationArgs, 'input'>
  >
  login: Resolver<
    ResolversTypes['AuthPayload'],
    ParentType,
    ContextType,
    RequireFields<MutationLoginArgs, 'email' | 'password'>
  >
  register: Resolver<
    ResolversTypes['AuthPayload'],
    ParentType,
    ContextType,
    RequireFields<MutationRegisterArgs, 'input'>
  >
  startDrone: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<MutationStartDroneArgs, 'bookingId'>
  >
  updateUserLanguage: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateUserLanguageArgs, 'email' | 'language'>
  >
  logout: Resolver<ResolversTypes['LogoutResponse'], ParentType, ContextType>
}

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
  allDestinations: Resolver<
    Array<ResolversTypes['Destination']>,
    ParentType,
    ContextType
  >
  getRoute: Resolver<
    ResolversTypes['Route'],
    ParentType,
    ContextType,
    RequireFields<QueryGetRouteArgs, 'start' | 'stop'>
  >
  drones: Resolver<Array<ResolversTypes['Drone']>, ParentType, ContextType>
  bookings: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Booking']>>>,
    ParentType,
    ContextType
  >
}

export type RouteResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Route'] = ResolversParentTypes['Route']
> = {
  trips: Resolver<Array<ResolversTypes['Trip']>, ParentType, ContextType>
}

export interface RuleWrapperScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['RuleWrapper'], any> {
  name: 'RuleWrapper'
}

export type SubscriptionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']
> = {
  dronePosition: SubscriptionResolver<
    ResolversTypes['InitDroneResponse'],
    'dronePosition',
    ParentType,
    ContextType,
    RequireFields<SubscriptionDronePositionArgs, 'id'>
  >
  droneStatus: SubscriptionResolver<
    Maybe<ResolversTypes['DroneStatusResponse']>,
    'droneStatus',
    ParentType,
    ContextType,
    RequireFields<SubscriptionDroneStatusArgs, 'id'>
  >
  hasStarted: SubscriptionResolver<
    ResolversTypes['String'],
    'hasStarted',
    ParentType,
    ContextType
  >
}

export type TripResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Trip'] = ResolversParentTypes['Trip']
> = {
  geoJson: Resolver<ResolversTypes['Geometry'], ParentType, ContextType>
  distance: Resolver<ResolversTypes['Float'], ParentType, ContextType>
}

export interface UploadScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload'
}

export type Resolvers<ContextType = any> = {
  AuthPayload: AuthPayloadResolvers<ContextType>
  Booking: BookingResolvers<ContextType>
  Coordinates: CoordinatesResolvers<ContextType>
  Destination: DestinationResolvers<ContextType>
  Drone: DroneResolvers<ContextType>
  DroneStatusResponse: DroneStatusResponseResolvers<ContextType>
  Geometry: GeometryResolvers<ContextType>
  hasStartedResponse: HasStartedResponseResolvers<ContextType>
  InitDroneResponse: InitDroneResponseResolvers<ContextType>
  JSON: GraphQLScalarType
  JSONObject: GraphQLScalarType
  LogoutResponse: LogoutResponseResolvers<ContextType>
  Mutation: MutationResolvers<ContextType>
  Query: QueryResolvers<ContextType>
  Route: RouteResolvers<ContextType>
  RuleWrapper: GraphQLScalarType
  Subscription: SubscriptionResolvers<ContextType>
  Trip: TripResolvers<ContextType>
  Upload: GraphQLScalarType
}

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>
export type DirectiveResolvers<ContextType = any> = {
  maxLength: MaxLengthDirectiveResolver<any, any, ContextType>
  minLength: MinLengthDirectiveResolver<any, any, ContextType>
  isEmail: IsEmailDirectiveResolver<any, any, ContextType>
  isAuthenticated: IsAuthenticatedDirectiveResolver<any, any, ContextType>
  cacheControl: CacheControlDirectiveResolver<any, any, ContextType>
}

/**
 * @deprecated
 * Use "DirectiveResolvers" root object instead. If you wish to get "IDirectiveResolvers", add "typesPrefix: I" to your config.
 */
export type IDirectiveResolvers<ContextType = any> = DirectiveResolvers<
  ContextType
>
