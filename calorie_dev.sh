if [ ! $CALORIE_DIR ]; then export CALORIE_DIR=$HOME/workspace/Justa/calorie_tracker; fi

cd $CALORIE_DIR
tmux new-session  -d -s calorie
tmux set-environment -t calorie -g CALORIE_DIR $CALORIE_DIR

tmux new-window     -t calorie -n 'Web'
tmux send-key       -t calorie 'cd $CALORIE_DIR' Enter 'rails s'  Enter

tmux new-window     -t calorie -n 'Console'
tmux send-key       -t calorie 'cd $CALORIE_DIR' Enter 'rails c'  Enter

tmux new-window     -t calorie -n 'Bash2'
tmux send-key       -t calorie 'cd $CALORIE_DIR' Enter

tmux new-window     -t calorie -n 'Vim'
tmux send-key       -t calorie 'cd $CALORIE_DIR' Enter 'vim .'    Enter

tmux attach-session -t calorie
