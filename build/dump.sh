echo 'Initialising...'
sleep 1
echo 'Dumping SQL files to postgres'
echo ''
sleep 2
psql -h localhost -U postgres -q -f gymd.sql
psql -h localhost -U postgres -q -f gym_insert.sql
psql -h localhost -U postgres -q -f gymuser.sql
echo 'Database building is done'
echo ''
sleep 2
cd ..
cd src/
echo "Installing dependencies"
echo ""
pip3 install -r requirements.txt
echo ""
echo "Finished one-time setup. Run start.sh to start the server"
