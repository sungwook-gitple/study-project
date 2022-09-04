type User = {
  id: string,
  name: string
};

export function isPassportUser (user: any): user is User {

  return user.id && user.name;
}