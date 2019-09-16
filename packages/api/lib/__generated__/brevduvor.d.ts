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
  /** The `Upload` scalar type represents a file upload. */
  Upload: any
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
  lat: Scalars['Float']
  lon: Scalars['Float']
}

export type DronePositionResponse = {
  __typename?: 'DronePositionResponse'
  start?: Maybe<Coordinates>
  stop?: Maybe<Coordinates>
  currentPos: Coordinates
  bearing?: Maybe<Scalars['Int']>
  status?: Maybe<Scalars['String']>
  batteryStatus?: Maybe<Scalars['Int']>
  departure?: Maybe<Scalars['String']>
  eta?: Maybe<Scalars['String']>
}

export type InitDroneReponse = {
  __typename?: 'InitDroneReponse'
  waypoints?: Maybe<Array<Maybe<Coordinates>>>
  id?: Maybe<Scalars['String']>
}

export type Mutation = {
  __typename?: 'Mutation'
  initDrone: InitDroneReponse
  startDrone: StartDroneResponse
}

export type MutationInitDroneArgs = {
  start: DestinationInput
  stop: DestinationInput
}

export type MutationStartDroneArgs = {
  id: Scalars['String']
}

export type Query = {
  __typename?: 'Query'
  allDestinations: Array<Destination>
}

export type StartDroneResponse = {
  __typename?: 'startDroneResponse'
  id: Scalars['String']
  status: Scalars['String']
}

export type Subscription = {
  __typename?: 'Subscription'
  dronePosition?: Maybe<DronePositionResponse>
}

export type SubscriptionDronePositionArgs = {
  id: Scalars['String']
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
  Mutation: ResolverTypeWrapper<{}>
  DestinationInput: DestinationInput
  InitDroneReponse: ResolverTypeWrapper<InitDroneReponse>
  Coordinates: ResolverTypeWrapper<Coordinates>
  startDroneResponse: ResolverTypeWrapper<StartDroneResponse>
  Subscription: ResolverTypeWrapper<{}>
  DronePositionResponse: ResolverTypeWrapper<DronePositionResponse>
  Int: ResolverTypeWrapper<Scalars['Int']>
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>
  CacheControlScope: CacheControlScope
  Upload: ResolverTypeWrapper<Scalars['Upload']>
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {}
  Destination: Destination
  String: Scalars['String']
  Float: Scalars['Float']
  Mutation: {}
  DestinationInput: DestinationInput
  InitDroneReponse: InitDroneReponse
  Coordinates: Coordinates
  startDroneResponse: StartDroneResponse
  Subscription: {}
  DronePositionResponse: DronePositionResponse
  Int: Scalars['Int']
  Boolean: Scalars['Boolean']
  CacheControlScope: CacheControlScope
  Upload: Scalars['Upload']
}

export type CacheControlDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = {
    maxAge?: Maybe<Maybe<Scalars['Int']>>
    scope?: Maybe<Maybe<CacheControlScope>>
  }
> = DirectiveResolverFn<Result, Parent, ContextType, Args>

export type CoordinatesResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Coordinates'] = ResolversParentTypes['Coordinates']
> = {
  lat?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
  lon?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
}

export type DestinationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Destination'] = ResolversParentTypes['Destination']
> = {
  alias?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  lat?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
  lon?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
}

export type DronePositionResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['DronePositionResponse'] = ResolversParentTypes['DronePositionResponse']
> = {
  start?: Resolver<
    Maybe<ResolversTypes['Coordinates']>,
    ParentType,
    ContextType
  >
  stop?: Resolver<Maybe<ResolversTypes['Coordinates']>, ParentType, ContextType>
  currentPos?: Resolver<ResolversTypes['Coordinates'], ParentType, ContextType>
  bearing?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  batteryStatus?: Resolver<
    Maybe<ResolversTypes['Int']>,
    ParentType,
    ContextType
  >
  departure?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  eta?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
}

export type InitDroneReponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['InitDroneReponse'] = ResolversParentTypes['InitDroneReponse']
> = {
  waypoints?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Coordinates']>>>,
    ParentType,
    ContextType
  >
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
}

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = {
  initDrone?: Resolver<
    ResolversTypes['InitDroneReponse'],
    ParentType,
    ContextType,
    RequireFields<MutationInitDroneArgs, 'start' | 'stop'>
  >
  startDrone?: Resolver<
    ResolversTypes['startDroneResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationStartDroneArgs, 'id'>
  >
}

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
  allDestinations?: Resolver<
    Array<ResolversTypes['Destination']>,
    ParentType,
    ContextType
  >
}

export type StartDroneResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['startDroneResponse'] = ResolversParentTypes['startDroneResponse']
> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>
}

export type SubscriptionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']
> = {
  dronePosition?: SubscriptionResolver<
    Maybe<ResolversTypes['DronePositionResponse']>,
    'dronePosition',
    ParentType,
    ContextType,
    RequireFields<SubscriptionDronePositionArgs, 'id'>
  >
}

export interface UploadScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload'
}

export type Resolvers<ContextType = any> = {
  Coordinates?: CoordinatesResolvers<ContextType>
  Destination?: DestinationResolvers<ContextType>
  DronePositionResponse?: DronePositionResponseResolvers<ContextType>
  InitDroneReponse?: InitDroneReponseResolvers<ContextType>
  Mutation?: MutationResolvers<ContextType>
  Query?: QueryResolvers<ContextType>
  startDroneResponse?: StartDroneResponseResolvers<ContextType>
  Subscription?: SubscriptionResolvers<ContextType>
  Upload?: GraphQLScalarType
}

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>
export type DirectiveResolvers<ContextType = any> = {
  cacheControl?: CacheControlDirectiveResolver<any, any, ContextType>
}

/**
 * @deprecated
 * Use "DirectiveResolvers" root object instead. If you wish to get "IDirectiveResolvers", add "typesPrefix: I" to your config.
 */
export type IDirectiveResolvers<ContextType = any> = DirectiveResolvers<
  ContextType
>
