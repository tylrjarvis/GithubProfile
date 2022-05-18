import React, { Component } from 'react';
import Link from '../components/Link/Link';
import List from '../components/List/List';
import ListSingle from '../components/List/ListSingle';
import styled from 'styled-components';

const ProfileWrapper = styled.div`
    width: 50%;
    margin: 10px auto;
`;
   
const Avatar = styled.img`
    width: 150px;
`;

class Profile extends Component {
    constructor(){
        super();
        this.state = {
            data: {},
            repositories: [],
            loading: true,
        }
    }

    async componentDidMount() {
        try {
            const profile = await fetch('https://api.github.com/users/tylrjarvis');
            const profileJSON = await profile.json();

            if(profileJSON){
                const repositories = await fetch(profileJSON.repos_url);
                const repositoriesJSON = await repositories.json();


                this.setState({
                    data: profileJSON,
                    repositories: repositoriesJSON,
                    loading: false,
                    error: '',
                })
            }
        }
        catch(error) {
            this.setState({
                loading: false,
                error: error.message,
            })
        }
    }

    render() {
        const { data, loading, repositories, error} = this.state;

        if(loading || error){
            return <div>{loading ? 'Loading...' : error}</div>;
        }

        const items = [
            { label: 'URL', value: <Link url={data.html_url} title='Github URL' /> },
            { label: 'Repos', value: data.repos_url },
            { label: 'Name', value: data.name },
            { label: 'Email', value: "tylrjarvis@yahoo.com" },
        ]

        const projects = repositories.map( repository => ({
            label: repository.name,
            description: repository.description,
            value: <Link url={repository.html_url} title='Github URL' />,
        }))

        const projects2 = ({
            label: "DataMiningProject",
            value: <Link url="https://git-classes.mst.edu/amh6wr/cs5402/" title='Github URL' />,
            description: "Data Mining Project Using WEKA and Python3",
        })

        return (
            <ProfileWrapper>
                <Avatar src={data.avatar_url} alt='avatar' />
                <List title='Profile' items={items} />
                <List title='Projects' items={projects} />
                <ListSingle item={projects2} />
            </ProfileWrapper>
        );
    }
}

export default Profile;