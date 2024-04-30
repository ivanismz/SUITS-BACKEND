#!/usr/bin/env python3
import subprocess
import shlex
import os
from pathlib import Path
from typing import Union
import time


class SshClient():
    """ Perform commands and copy files on ssh using subprocess 
        and native ssh client (OpenSSH).
    """
    
    def __init__(self,
                 user: str,
                 remote: str,
                 key_path: Union[str, Path]) -> None:
        """
        Args:
            user (str): username for the remote
            remote (str): remote host IP/DNS
            key_path (str or pathlib.Path): path to .pem file
        """
        self.user = user
        self.remote = remote
        self.key_path = str(key_path)
        
        
    def cmd(self, 
            cmds: list[str],
            check=True,
            strict_host_key_checking=False,
            **run_kwargs) -> subprocess.CompletedProcess:
        
        """runs commands consecutively, ensuring success of each
            after calling the next command.
        Args:
            cmds (list[str]): list of commands to run.
            strict_host_key_checking (bool, optional): Defaults to True.
        """
        
        strict_host_key_checking = 'yes' if strict_host_key_checking else 'no'
        cmd = ' && '.join(cmds)
        return subprocess.run(
            [
                'ssh',
                '-i', self.key_path,
                '-o', f'StrictHostKeyChecking={strict_host_key_checking}', 
                '-o', 'UserKnownHostsFile=/dev/null',
                '-o', 'LogLevel=ERROR',
                f'{self.user}@{self.remote}',
                cmd
            ],
            check=check,
            **run_kwargs
        )
        
        
    def scp(self,
            sources: list[Union[str, bytes, os.PathLike]],
            destination: Union[str, bytes, os.PathLike],
            check=True,
            strict_host_key_checking=False,
            recursive=False,
            **run_kwargs) -> subprocess.CompletedProcess:
        
        """Copies `srouce` file to remote `destination` using the 
            native `scp` command.
            
        Args:
            source (Union[str, bytes, os.PathLike]): List of source files path.
            destination (Union[str, bytes, os.PathLike]): Destination path on remote.
        """

        strict_host_key_checking = 'yes' if strict_host_key_checking else 'no'

        return subprocess.run(
            list(filter(bool, [
                'scp',
                '-i', self.key_path,
                '-o', f'StrictHostKeyChecking={strict_host_key_checking}', 
                '-o', 'UserKnownHostsFile=/dev/null',
                '-o', 'LogLevel=ERROR',
                '-r' if recursive else '',
                *map(str, sources),
                # sources, 
                f'{self.user}@{self.remote}:{str(destination)}',
            ])),
            check=check,
            **run_kwargs
        )
        
    def validate(self):
        return self.cmd([f'echo " "'], check=False).returncode == 0


    def ssh_connect_cmd(self) -> str:
        return f'ssh -i {self.key_path} {self.user}@{self.remote}'


def main():
    #cmdargs = shlex.split("ros2 launch rplidar_ros rplidar_a2m12_launch.py")
    
    client1 = SshClient(user='pi', remote='10.0.0.1', key_path='~/.ssh/id_rsa.pub')
    client2 = SshClient(user='pi', remote='10.0.0.1', key_path='~/.ssh/id_rsa.pub')
    client3 = SshClient(user='pi', remote='10.0.0.1', key_path='~/.ssh/id_rsa.pub')
    # run a list of commands
    client1.cmd(['cd LeoRover-SLAM-ROS2', 'source /opt/ros/humble/setup.bash', 'ros2 launch rplidar_ros rplidar_a2m12_launch.py']) 

    client2.cmd(['source /opt/ros/humble/setup.bash', 'ros2 run leo_bringup leo_system']) 
    client3.cmd(['source /opt/ros/humble/setup.bash', 'ros2 run tf2_ros static_transform_publisher 0.1 0 0.02 3.1415926 0 0 base_link laser']) 
    time.sleep(2)
    print("system ^C")
    os.system("^C")

main()