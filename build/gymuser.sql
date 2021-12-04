alter role postgres with password 'post_123';
\c gymd
create role admin superuser login password 'admin_123';
create role mod login password 'mod_123';
create role staff login password 'staff_123';

grant select on dplan, equipment, member, nutritionist, snp, trainer, wplan to mod;
grant select, update on member, trainer, nutritionist to staff;
