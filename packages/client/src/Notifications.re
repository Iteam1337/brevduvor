module Notification = {
  type notificationType =
    | Error(I18n.Error.t)
    | Info(I18n.Translations.t)
    | Success(I18n.Translations.t);

  type t = {
    id: Utils.UUID.t,
    onClick: option(unit => unit),
    timeout: option(int),
    notificationType,
  };

  let make = (~notificationType, ~timeout=None, ~onClick=None, ()) => {
    id: Utils.UUID.make(),
    onClick,
    timeout,
    notificationType,
  };
};

module Context = {
  type t = {
    notifications: list(Notification.t),
    removeNotification: Utils.UUID.t => unit,
    updateNotifications: Notification.t => unit,
  };

  include ReactContext.Make({
    type context = t;
    let defaultValue = {
      notifications: [],
      removeNotification: _ => (),
      updateNotifications: _ => (),
    };
  });
};

module Provider = {
  type state = list(Notification.t);

  type action =
    | RemoveNotification(Utils.UUID.t)
    | UpdateNotifications(Notification.t);

  [@react.component]
  let make = (~children) => {
    let (state, dispatch) =
      React.useReducer(
        (state, action) =>
          switch (action) {
          | RemoveNotification(id) =>
            state->Belt.List.keep(n => Notification.(n.id) !== id)
          | UpdateNotifications(notification) => [notification, ...state]
          },
        [],
      );

    let updateNotifications = (notification: Notification.t) => {
      dispatch(UpdateNotifications(notification));
    };

    let removeNotification = id => {
      dispatch(RemoveNotification(id));
    };

    <Context.Provider
      value={notifications: state, updateNotifications, removeNotification}>
      children
    </Context.Provider>;
  };
};

[@react.component]
let make = () => {
  let ctx = React.useContext(Context.t);

  <div className="absolute z-10 top-4 right-4">
    {ctx.notifications
     ->Belt.List.map(({notificationType, id, timeout}) =>
         switch (notificationType) {
         | Success(successMessage) =>
           <Alert.Success
             className="notification mb-4"
             key={id->Utils.UUID.toString}
             onRemove={Some(() => ctx.removeNotification(id))}
             timeout>
             successMessage
           </Alert.Success>
         | Error(errorMessage) =>
           <Alert.Error
             className="notification mb-4"
             key={id->Utils.UUID.toString}
             onRemove={Some(() => ctx.removeNotification(id))}
             timeout>
             errorMessage
           </Alert.Error>
         | Info(infoMessage) =>
           <Alert.Info
             className="notification mb-4"
             key={id->Utils.UUID.toString}
             onRemove={Some(() => ctx.removeNotification(id))}
             timeout>
             infoMessage
           </Alert.Info>
         }
       )
     ->Belt.List.toArray
     ->React.array}
  </div>;
};
