

export interface IContact {
    user_id?: string,
    contact_id?:  string
    file?: string
    phone_number?: string
    first_name?: string
    last_name?: string  
};

export interface IGroupAdd {
    group_title?: string
    contact_ids?: string[]
};

export interface  IGroup  {
    contacts: IContact[]
    group_id: string
    group_title: string
    user_id: string
};


export interface iContactsSearch {
    first_name?: string
    last_name?: string
    phone_number?: string
};