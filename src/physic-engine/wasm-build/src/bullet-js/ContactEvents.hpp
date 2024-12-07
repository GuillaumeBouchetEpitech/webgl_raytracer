
#include "ContactData.hpp"

namespace btjsContactEvents
{
    typedef void (*t_btjsContactCallback)(int, btjsContactData*);

    t_btjsContactCallback	getContactCallback();
};
