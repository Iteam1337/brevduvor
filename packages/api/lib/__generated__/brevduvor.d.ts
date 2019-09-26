import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any,
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: any,
  /** The `Upload` scalar type represents a file upload. */
  Upload: any,
};



export type AuthPayload = {
   __typename?: 'AuthPayload',
  id: Scalars['ID'],
  token?: Maybe<Scalars['String']>,
  username?: Maybe<Scalars['String']>,
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type Coordinates = {
   __typename?: 'Coordinates',
  lat: Scalars['Float'],
  lon: Scalars['Float'],
};

export type Destination = {
   __typename?: 'Destination',
  alias: Scalars['String'],
  lat: Scalars['Float'],
  lon: Scalars['Float'],
};

export type DestinationInput = {
  alias: Scalars['String'],
  lat: Scalars['Float'],
  lon: Scalars['Float'],
};

export type DronePositionResponse = {
   __typename?: 'DronePositionResponse',
  id?: Maybe<Scalars['String']>,
  currentPos: Coordinates,
  bearing?: Maybe<Scalars['Int']>,
  status?: Maybe<Scalars['String']>,
  batteryStatus?: Maybe<Scalars['Int']>,
};

export type Geometry = {
   __typename?: 'Geometry',
  type: Scalars['String'],
  coordinates: Scalars['JSON'],
};

export type InitDroneResponse = {
   __typename?: 'InitDroneResponse',
  id: Scalars['String'],
  start: Coordinates,
  stop: Coordinates,
  currentPos: Coordinates,
  bearing?: Maybe<Scalars['Int']>,
  status?: Maybe<Scalars['String']>,
  batteryStatus?: Maybe<Scalars['Int']>,
  departure?: Maybe<Scalars['String']>,
  eta?: Maybe<Scalars['String']>,
};



export type Mutation = {
   __typename?: 'Mutation',
  initDrone: InitDroneResponse,
  startDrone: StartDroneResponse,
  login: AuthPayload,
};


export type MutationInitDroneArgs = {
  start: DestinationInput,
  stop: DestinationInput
};


export type MutationStartDroneArgs = {
  id: Scalars['String']
};


export type MutationLoginArgs = {
  username: Scalars['String'],
  password: Scalars['String']
};

export type Query = {
   __typename?: 'Query',
  allDestinations: Array<Destination>,
  getRoute: Route,
};


export type QueryGetRouteArgs = {
  start: DestinationInput,
  stop: DestinationInput
};

export type Route = {
   __typename?: 'Route',
  trips: Array<Trip>,
};

export type StartDroneResponse = {
   __typename?: 'StartDroneResponse',
  id: Scalars['String'],
};

export type Subscription = {
   __typename?: 'Subscription',
  dronePosition: InitDroneResponse,
};


export type SubscriptionDronePositionArgs = {
  id: Scalars['String']
};

export type Trip = {
   __typename?: 'Trip',
  geoJson: Geometry,
  distance: Scalars['Float'],
};



export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>,
  Destination: ResolverTypeWrapper<Destination>,
  String: ResolverTypeWrapper<Scalars['String']>,
  Float: ResolverTypeWrapper<Scalars['Float']>,
  DestinationInput: DestinationInput,
  Route: ResolverTypeWrapper<Route>,
  Trip: ResolverTypeWrapper<Trip>,
  Geometry: ResolverTypeWrapper<Geometry>,
  JSON: ResolverTypeWrapper<Scalars['JSON']>,
  Mutation: ResolverTypeWrapper<{}>,
  InitDroneResponse: ResolverTypeWrapper<InitDroneResponse>,
  Coordinates: ResolverTypeWrapper<Coordinates>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  StartDroneResponse: ResolverTypeWrapper<StartDroneResponse>,
  AuthPayload: ResolverTypeWrapper<AuthPayload>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  Subscription: ResolverTypeWrapper<{}>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  CacheControlScope: CacheControlScope,
  DronePositionResponse: ResolverTypeWrapper<DronePositionResponse>,
  JSONObject: ResolverTypeWrapper<Scalars['JSONObject']>,
  Upload: ResolverTypeWrapper<Scalars['Upload']>,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {},
  Destination: Destination,
  String: Scalars['String'],
  Float: Scalars['Float'],
  DestinationInput: DestinationInput,
  Route: Route,
  Trip: Trip,
  Geometry: Geometry,
  JSON: Scalars['JSON'],
  Mutation: {},
  InitDroneResponse: InitDroneResponse,
  Coordinates: Coordinates,
  Int: Scalars['Int'],
  StartDroneResponse: StartDroneResponse,
  AuthPayload: AuthPayload,
  ID: Scalars['ID'],
  Subscription: {},
  Boolean: Scalars['Boolean'],
  CacheControlScope: CacheControlScope,
  DronePositionResponse: DronePositionResponse,
  JSONObject: Scalars['JSONObject'],
  Upload: Scalars['Upload'],
};

export type IsAuthenticatedDirectiveResolver<Result, Parent, ContextType = any, Args = {  }> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type CacheControlDirectiveResolver<Result, Parent, ContextType = any, Args = {   maxAge?: Maybe<Maybe<Scalars['Int']>>,
  scope?: Maybe<Maybe<CacheControlScope>> }> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AuthPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthPayload'] = ResolversParentTypes['AuthPayload']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
};

export type CoordinatesResolvers<ContextType = any, ParentType extends ResolversParentTypes['Coordinates'] = ResolversParentTypes['Coordinates']> = {
  lat?: Resolver<ResolversTypes['Float'], ParentType, ContextType>,
  lon?: Resolver<ResolversTypes['Float'], ParentType, ContextType>,
};

export type DestinationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Destination'] = ResolversParentTypes['Destination']> = {
  alias?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  lat?: Resolver<ResolversTypes['Float'], ParentType, ContextType>,
  lon?: Resolver<ResolversTypes['Float'], ParentType, ContextType>,
};

export type DronePositionResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['DronePositionResponse'] = ResolversParentTypes['DronePositionResponse']> = {
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  currentPos?: Resolver<ResolversTypes['Coordinates'], ParentType, ContextType>,
  bearing?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  batteryStatus?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
};

export type GeometryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Geometry'] = ResolversParentTypes['Geometry']> = {
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  coordinates?: Resolver<ResolversTypes['JSON'], ParentType, ContextType>,
};

export type InitDroneResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['InitDroneResponse'] = ResolversParentTypes['InitDroneResponse']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  start?: Resolver<ResolversTypes['Coordinates'], ParentType, ContextType>,
  stop?: Resolver<ResolversTypes['Coordinates'], ParentType, ContextType>,
  currentPos?: Resolver<ResolversTypes['Coordinates'], ParentType, ContextType>,
  bearing?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  batteryStatus?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  departure?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  eta?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
};

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON'
}

export interface JsonObjectScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSONObject'], any> {
  name: 'JSONObject'
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  initDrone?: Resolver<ResolversTypes['InitDroneResponse'], ParentType, ContextType, RequireFields<MutationInitDroneArgs, 'start' | 'stop'>>,
  startDrone?: Resolver<ResolversTypes['StartDroneResponse'], ParentType, ContextType, RequireFields<MutationStartDroneArgs, 'id'>>,
  login?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'username' | 'password'>>,
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  allDestinations?: Resolver<Array<ResolversTypes['Destination']>, ParentType, ContextType>,
  getRoute?: Resolver<ResolversTypes['Route'], ParentType, ContextType, RequireFields<QueryGetRouteArgs, 'start' | 'stop'>>,
};

export type RouteResolvers<ContextType = any, ParentType extends ResolversParentTypes['Route'] = ResolversParentTypes['Route']> = {
  trips?: Resolver<Array<ResolversTypes['Trip']>, ParentType, ContextType>,
};

export type StartDroneResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['StartDroneResponse'] = ResolversParentTypes['StartDroneResponse']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  dronePosition?: SubscriptionResolver<ResolversTypes['InitDroneResponse'], "dronePosition", ParentType, ContextType, RequireFields<SubscriptionDronePositionArgs, 'id'>>,
};

export type TripResolvers<ContextType = any, ParentType extends ResolversParentTypes['Trip'] = ResolversParentTypes['Trip']> = {
  geoJson?: Resolver<ResolversTypes['Geometry'], ParentType, ContextType>,
  distance?: Resolver<ResolversTypes['Float'], ParentType, ContextType>,
};

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload'
}

export type Resolvers<ContextType = any> = {
  AuthPayload?: AuthPayloadResolvers<ContextType>,
  Coordinates?: CoordinatesResolvers<ContextType>,
  Destination?: DestinationResolvers<ContextType>,
  DronePositionResponse?: DronePositionResponseResolvers<ContextType>,
  Geometry?: GeometryResolvers<ContextType>,
  InitDroneResponse?: InitDroneResponseResolvers<ContextType>,
  JSON?: GraphQLScalarType,
  JSONObject?: GraphQLScalarType,
  Mutation?: MutationResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  Route?: RouteResolvers<ContextType>,
  StartDroneResponse?: StartDroneResponseResolvers<ContextType>,
  Subscription?: SubscriptionResolvers<ContextType>,
  Trip?: TripResolvers<ContextType>,
  Upload?: GraphQLScalarType,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
export type DirectiveResolvers<ContextType = any> = {
  isAuthenticated?: IsAuthenticatedDirectiveResolver<any, any, ContextType>,
  cacheControl?: CacheControlDirectiveResolver<any, any, ContextType>,
};


/**
* @deprecated
* Use "DirectiveResolvers" root object instead. If you wish to get "IDirectiveResolvers", add "typesPrefix: I" to your config.
*/
export type IDirectiveResolvers<ContextType = any> = DirectiveResolvers<ContextType>;